import React from 'react'
import { FloraComponent } from './classification/FloraComponent'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Login from "./login";

export default class Classification extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: null,
            showErrorBlock: false,
            show: false,
        }
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    }

    render(): React.ReactElement {
        return (
            <>
            <div className="container">
                <Navbar className="navbar justify-content-between navbar-expand-lg navbar-light bg-light">
                    <Navbar.Brand href="/">Флора</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end mr-3">
                        <Navbar.Text>
                            { this.state.user ? this.state.user : 'Гость' }
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Form inline>
                        {
                            this.state.user ?
                                <Button onClick={this.handleLogout}>Выход</Button> :
                                <Button onClick={this.handleShow}>Вход</Button>
                        }
                    </Form>
                </Navbar>

                <FloraComponent/>
            </div>
                <Login show={this.state.show}
                       handleModalClose={this.handleModalClose}
                       handleSuccessfulLogin={this.handleSuccessfulLogin}
                />

                <Modal show={false} size="lg"
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
            </>
        )
    }

    handleLogout() {
        this.setState({
            user: null,
        })
    }

    handleShow() {
        this.setState({
            show: true,
        })
    }

    handleModalClose() {
        this.setState({
            show: false,
        })
    }

    handleSuccessfulLogin(token: string, username: string) {
        this.setState({
            user: username
        })
    }
}
