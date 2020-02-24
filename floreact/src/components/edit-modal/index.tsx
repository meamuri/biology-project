import React, { FormEvent } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button"
import { SpeciesRecord } from '../../lib/taxon'

type EditSpeciesModalProps = {
    species: SpeciesRecord,
    show: boolean,
    handleCloseEditModal: () => void,
}

export default class EditSpeciesModal extends React.Component<EditSpeciesModalProps, any> {
    constructor(props: EditSpeciesModalProps) {
        super(props)
        this.state = {
            currentFrequency: props.species.frequency || 'UNKNOWN',
            description: props.species.description || '',
            isFieldsChanged: false,
        }
        this.handleFormInput = this.handleFormInput.bind(this)
        this.handleFrequencyChange = this.handleFrequencyChange.bind(this)
    }

    render() {
        return <Modal show={this.props.show} size="lg"
            onHide={this.props.handleCloseEditModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>Редактирование вида</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Латинское название
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.species.name} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Русское название
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.species.ruLocaleName} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Описание
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control onChange={this.handleFormInput} defaultValue={this.props.species.description} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Встречаемость
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control as="select" onChange={this.handleFrequencyChange}>
                            {['HIGH', 'MEDIUM', 'LOW', 'UNKNOWN'].map((frequency, i) =>
                                <option key={i}>{frequency}</option>
                            )}
                        </Form.Control>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleCloseEditModal}>
                    Отмена
                </Button>
                <Button disabled={!this.state.isFieldsChanged} variant="primary" onClick={this.props.handleCloseEditModal}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    }

    handleFrequencyChange(event: FormEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value)
        this.setState({
            currentFrequency: event.currentTarget.value,
            // TODO: it does not work with empty fields
            isFieldsChanged: event.currentTarget.value !== this.props.species.frequency,
        })
    }

    handleFormInput(event: FormEvent<HTMLInputElement>) {
        event.preventDefault()
        this.setState({
            description: event.currentTarget.value,
            // TODO: it does not work with empty fields
            isFieldsChanged: event.currentTarget.value !== this.props.species.description,
        })
    }

}
