import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

export default class EditSpeciesModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.handleShow = this.handleShow.bind(this)
    }

    render() {
        return <Modal show={false} size="lg"
            // onHide={this.handleClose}
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
                            <Form.Control plaintext readOnly defaultValue="Scrophularia cretacea Fish. ex Spreng." />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Русское название
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue="Норичник меловой" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Описание
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Описание
                        </Form.Label>
                        <Col sm="8">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    HIGH
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">HIGH</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">MEDIUM</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">LOW</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleShow}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={this.handleShow}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    }

    handleShow() {

    }
}
