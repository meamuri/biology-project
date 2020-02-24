import React from 'react'
import { FloraComponent } from './classification/FloraComponent'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import Login from "./login";
import EditSpeciesModal from "./edit-modal";

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
                {this.state.show &&
                <Login show={this.state.show}
                       handleModalClose={this.handleModalClose}
                       handleSuccessfulLogin={this.handleSuccessfulLogin}
                />}
                <EditSpeciesModal/>
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
