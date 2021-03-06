
import React, {FormEvent} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import FloraApiClient from '../../lib/api'

type LoginProps = {
    show: boolean,
    handleSuccessfulLogin: (token: string, username: string) => void,
    handleModalClose: () => void,
    httpClient: FloraApiClient,
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
        this.handleKeyPress = this.handleKeyPress.bind(this)
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
                                          onKeyPress={this.handleKeyPress}
                                          type="email"
                                          placeholder="логин" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control value={this.state.password}
                                          onChange={this.handleFormInput.bind(this, 'password')}
                                          onKeyPress={this.handleKeyPress}
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

    private async handleKeyPress(target: React.KeyboardEvent<HTMLInputElement>) {
        if (target.key === 'Enter') {
            await this.handleLogin()
        }
    }

    async handleLogin() {
        try {
            let res = await this.props.httpClient.login(this.state.username, this.state.password)
            this.props.handleSuccessfulLogin(res.token, this.state.username)
            this.handleClose()
        } catch (e) {
            this.setState({
                showErrorBlock: true,
            })
        }
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
