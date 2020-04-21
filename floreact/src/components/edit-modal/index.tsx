import React, { FormEvent } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { SpeciesRecord } from '../../lib/taxon'
import FloraApiClient from '../../lib/api'
import { describeFrequency, FREQUENCY } from '../../lib/frequency'

type EditSpeciesModalProps = {
    species: SpeciesRecord,
    show: boolean,
    handleCloseEditModal: () => void,
    handleSuccessfulUpdateSpeciesInfo: (changes: { description: string, frequency: FREQUENCY }) => void,
    token: string,
    httpClient: FloraApiClient,
}

export default class EditSpeciesModal extends React.Component<EditSpeciesModalProps, any> {
    constructor(props: EditSpeciesModalProps) {
        super(props)
        this.state = {
            currentFrequency: props.species.frequency || 'UNDEFINED',
            initialDescription: props.species.description || '',
            description: props.species.description || '',
        }
        this.handleFormInput = this.handleFormInput.bind(this)
        this.handleFrequencyChange = this.handleFrequencyChange.bind(this)
        this.handleOkButton = this.handleOkButton.bind(this)
    }

    render() {
        let isFieldsChanged = this.state.currentFrequency !== this.props.species.frequency ||
            this.state.initialDescription !== this.state.description
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
                            <Form.Control as='textarea' rows="8" onChange={this.handleFormInput} defaultValue={this.state.initialDescription} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Встречаемость
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control as="select" onChange={this.handleFrequencyChange} defaultValue={this.state.currentFrequency}>
                            {['DISAPPEARED', 'ENDANGERED', 'SHRINKING', 'RARE', 'RECOVERING', 'UNDEFINED'].map((frequency, i) =>
                                <option value={frequency} key={i}>{describeFrequency(frequency)}</option>
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
                <Button disabled={!isFieldsChanged} variant="primary" onClick={this.handleOkButton}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    }

    handleFrequencyChange(event: FormEvent<HTMLInputElement>) {
        this.setState({
            currentFrequency: event.currentTarget.value,
        })
    }

    handleFormInput(event: FormEvent<HTMLInputElement>) {
        event.preventDefault()
        this.setState({
            description: event.currentTarget.value,
        })
    }

    async handleOkButton() {
        let changes = {
            description: this.state.description,
            frequency: this.state.currentFrequency,
        }
        await this.props.httpClient.updateSpecies(
            this.props.species.id,
            changes)
        this.props.handleSuccessfulUpdateSpeciesInfo(changes)
    }

}
