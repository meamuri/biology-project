import React, { FormEvent } from 'react'
import { FloraComponent } from './classification/FloraComponent'
import { login } from '../lib/api'
import Alert from 'react-bootstrap/Alert'
import Navbar from 'react-bootstrap/Navbar'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";

export default class Classification extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            username: '',
            password: '',
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleLoginInput = this.handleLoginInput.bind(this)
    }

    render(): React.ReactElement {
        return (
            <div className="container">
                <Navbar className="navbar justify-content-between navbar-expand-lg navbar-light bg-light">
                    <Navbar.Brand href="/">Флора</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end mr-3">
                        <Navbar.Text>
                            Гость
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Form inline>
                        <Button onClick={this.handleShow}>Вход</Button>
                    </Form>
                </Navbar>

                <FloraComponent/>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Введите пароль</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Логин</Form.Label>
                                <Form.Control value={this.state.username} onChange={this.handleLoginInput} type="email" placeholder="логин" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="пароль" />
                            </Form.Group>
                        </Form>
                        {
                            false &&
                            <Alert variant='danger'>Некорректный пароль. Пожалуйста, обратитесь к администратору</Alert>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Войти
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    handleLoginInput(event: FormEvent<HTMLInputElement>) {
        event.preventDefault()
        this.setState({
            username: event.currentTarget.value,
        })
    }

    async handleLogin() {
        await login()
    }

    handleShow() {
        this.setState({
            show: true,
        })
    }

    handleClose() {
        this.setState({
            show: false,
        })
    }

}
