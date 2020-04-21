import React from 'react'
import { FloraComponent } from './classification/FloraComponent'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Login from './login'
import EditSpeciesModal from './edit-modal'
import FloraApiClient from '../lib/api'
import { PhylumTaxon, SpeciesRecord } from '../lib/taxon'
import { FloraClassification, initClassification } from './classification/schema'
import { FREQUENCY } from '../lib/frequency'
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"

type AppState =
    { [key: string]: any } &
    {
        data: PhylumTaxon[],
        classification: FloraClassification,
        selectedSpeciesId: string | null,
        species: {
            [key: string]: SpeciesRecord,
        },
    }

export default class Classification extends React.Component<any, AppState> {
    apiClient: FloraApiClient
    constructor(props: any) {
        super(props)
        let client = new FloraApiClient()

        let user = localStorage.getItem("user")
        let token = localStorage.getItem("token")
        client.setToken(token)

        this.state = {
            user,
            token,
            showErrorBlock: false,
            show: false,
            selectedSpeciesId: null,
            data: [],
            classification: initClassification(),
            species: {},
        }
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)

        this.handleSelectSpecies = this.handleSelectSpecies.bind(this)
        this.handleCloseEditModal = this.handleCloseEditModal.bind(this)
        this.handleSuccessfulUpdateSpeciesInfo = this.handleSuccessfulUpdateSpeciesInfo.bind(this)
        this.apiClient = client
    }

    async componentDidMount() {
        let response = await this.apiClient.getSpeciesTree()
        this.setState({data: response})

        let species = await this.apiClient.getSpecies()
        if (species === null) {
            return
        }

        let classification: FloraClassification = initClassification()
        for (let s of species) {
            classification.species[s.id] = s
        }
        this.setState({ species: classification.species })

        let token = this.state.token
        if (token !== null && !await this.apiClient.validateToken(token)) {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            this.setState({
                token: null,
                user: null,
            })
        }
    }

    render(): React.ReactElement {
        return (
            <>
                <Row>
                    <Col xs={1} />
                    <Col xs={10} >
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
                    </Col>
                </Row>

                <Row>
                    <Col xs={1} />
                    <Col xs={8} >
                        <FloraComponent data={this.state.data} handleSelectSpecies={this.handleSelectSpecies} />
                    </Col>
                    <Col md={{offset: 9}} className="fixed-top" style={{marginTop: '62px'}}>
                        <Accordion className="mt-3" defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Природоохранный статус
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>HIGH</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Местоположение
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>

                {this.state.show &&
                <Login show={this.state.show}
                       handleModalClose={this.handleModalClose}
                       handleSuccessfulLogin={this.handleSuccessfulLogin}
                       httpClient={this.apiClient}
                /> }
                {this.state.selectedSpeciesId &&
                <EditSpeciesModal
                    httpClient={this.apiClient}
                    handleSuccessfulUpdateSpeciesInfo={this.handleSuccessfulUpdateSpeciesInfo}
                    token={this.state.token}
                    show={this.state.selectedSpeciesId !== null}
                    species={this.state.species[this.state.selectedSpeciesId]}
                    handleCloseEditModal={this.handleCloseEditModal}
                /> }
            </>
        )
    }

    handleLogout() {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        this.setState({
            user: null,
            token: null,
        })
    }

    handleShow() {
        this.setState({ show: true, })
    }

    handleModalClose() {
        this.setState({ show: false, })
    }

    handleSuccessfulLogin(token: string, username: string) {
        let jwtToken = `Bearer ${token}`
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("user", username)
        this.setState({
            user: username,
            token: jwtToken,
        })
    }

    handleSelectSpecies(id: string) {
        this.setState({
            selectedSpeciesId: id,
        })
    }

    async handleSuccessfulUpdateSpeciesInfo(changes: { description: string, frequency: FREQUENCY }) {
        let response = await this.apiClient.getSpeciesTree()
        let id = this.state.selectedSpeciesId!
        let changedRecord = { ...this.state.species[id], ...changes }
        this.setState((state, props) => ({
            selectedSpeciesId: null,
            data: response as PhylumTaxon[],
            species: {
                ...state.species,
                [id]: changedRecord,
            },
        }))
    }

    handleCloseEditModal() {
        this.setState({
            selectedSpeciesId: null,
        })
    }
}
