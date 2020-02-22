import React from 'react'
import { FloraComponent } from './classification/FloraComponent'
import Navbar from 'react-bootstrap/Navbar'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";

export default class Classification extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }

    render(): React.ReactElement {
        return (
            <>
                <Navbar className="navbar justify-content-between navbar-expand-lg navbar-light bg-light">
                    <Navbar.Brand href="/">Flora</Navbar.Brand>
                    <Form inline>
                        <Button onClick={this.handleShow}>Submit</Button>
                    </Form>
                </Navbar>
                <div className="container">
                    <FloraComponent/>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
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
