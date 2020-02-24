
import React, {FormEvent} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { login } from "../../lib/api";

type LoginProps = {
    show: boolean,
    handleSuccessfulLogin: (token: string, username: string) => void,
    handleModalClose: () => void,
}

type LoginState = {
    [k: string]: any
}

export default class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            showErrorBlock: false,
            username: '',
            password: '',
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Введите пароль</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control value={ this.state.username }
                                          onChange={ this.handleFormInput.bind(this, 'username') }
                                          type="email"
                                          placeholder="логин" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control value={this.state.password}
                                          onChange={this.handleFormInput.bind(this, 'password')}
                                          type="password"
                                          placeholder="пароль" />
                        </Form.Group>
                    </Form>
                    {
                        this.state.showErrorBlock &&
                        <Alert variant='danger'>Некорректный пароль. Пожалуйста, обратитесь к администратору</Alert>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={this.handleLogin}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    async handleLogin() {
        let res = await login(this.state.username, this.state.password)
        if (res === null) {
            this.setState({
                showErrorBlock: true,
            })
            return
        }
        console.log(res.token)
        this.props.handleSuccessfulLogin(res.token, this.state.username)
        this.handleClose()
    }

    handleFormInput(key: 'username' | 'password', event: FormEvent<HTMLInputElement>) {
        event.preventDefault()
        this.setState({
            [key]: event.currentTarget.value,
        })
    }

    handleClose() {
        this.setState({
            username: '',
            password: '',
            showErrorBlock: false,
        })
        this.props.handleModalClose()
    }

}
