import React from 'react'
import { FloraComponent } from './classification/FloraComponent'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Login from './login'
import EditSpeciesModal from './edit-modal'
import FloraApiClient from '../lib/api'
import { PhylumTaxon, SpeciesRecord } from '../lib/taxon'
import { fillClassifications } from './classification/schema'
import { FREQUENCY } from '../lib/frequency'
import SpeciesView from './species'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Filter from './filter'

type AppState =
    { [key: string]: any } &
    {
        filters: ((record: SpeciesRecord) => boolean)[],
        data: PhylumTaxon[],
        selectedSpeciesId: string | null,
        species: Map<string, SpeciesRecord>,
        showDetails: boolean,
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
            showDetails: false,
            showEdit: false,
            selectedSpeciesId: null,
            data: [],
            species: new Map(),
            filters: [],
        }
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)

        this.handleSelectSpecies = this.handleSelectSpecies.bind(this)
        this.handleCloseEditModal = this.handleCloseEditModal.bind(this)
        this.handleCloseViewModal = this.handleCloseViewModal.bind(this)
        this.handleSuccessfulUpdateSpeciesInfo = this.handleSuccessfulUpdateSpeciesInfo.bind(this)
        this.updateFilters = this.updateFilters.bind(this)
        this.apiClient = client
    }

    async componentDidMount() {
        let species = await this.apiClient.getSpecies()
        if (species === null) {
            return
        }

        // TODO: prevent duplicate logic
        let filteredRecords = this.excludeSpecies(species, this.state.filters)
        this.setState({
            data: fillClassifications(filteredRecords),
            species: species.reduce((acc, e) => {
                acc.set(e.id!, e)
                return acc
            }, new Map<string, SpeciesRecord>())
        })

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
                        <Filter handleFiltersChanged={this.updateFilters}/>
                    </Col>
                </Row>

                {this.state.show &&
                <Login show={this.state.show}
                       handleModalClose={this.handleModalClose}
                       handleSuccessfulLogin={this.handleSuccessfulLogin}
                       httpClient={this.apiClient}
                /> }
                {this.state.showEdit &&
                <EditSpeciesModal
                    user={this.state.user}
                    httpClient={this.apiClient}
                    handleSuccessfulUpdateSpeciesInfo={this.handleSuccessfulUpdateSpeciesInfo}
                    token={this.state.token}
                    show={this.state.selectedSpeciesId !== null}
                    species={this.state.species.get(this.state.selectedSpeciesId!)!}
                    handleCloseEditModal={this.handleCloseEditModal}
                /> }
                {this.state.showDetails && <SpeciesView
                    data={this.state.species.get(this.state.selectedSpeciesId!)!}
                    show={this.state.showDetails}
                    handleCloseModal={this.handleCloseViewModal}
                />}
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
        this.apiClient.setToken(jwtToken)
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("user", username)
        this.setState({
            user: username,
            token: jwtToken,
        })
    }

    handleSelectSpecies(id: string, forAction: 'edit' | 'show') {
        let key = forAction === 'edit' ? 'showEdit' : 'showDetails'
        this.setState({
            [key]: true,
            selectedSpeciesId: id,
        })
    }

    async handleSuccessfulUpdateSpeciesInfo(changes: { description: string, frequency: FREQUENCY }) {
        let species = await this.apiClient.getSpecies()
        if (species === null) {
            // TODO: something else!
            return
        }

        // TODO: prevent duplicate logic
        let filteredRecords = this.excludeSpecies(species, this.state.filters)
        let id = this.state.selectedSpeciesId!
        let changedRecord = { ...this.state.species.get(id)!, ...changes } // TODO: why species.get is not a function?
        this.setState((state, props) => {
            let { species } = state
            species.set(id, changedRecord)
            return {
                showEdit: false,
                selectedSpeciesId: null,
                data: fillClassifications(filteredRecords),
                species,
            }
        })
    }

    private excludeSpecies(records: SpeciesRecord[], filtersSet: ((record: SpeciesRecord) => boolean)[]): SpeciesRecord[] {
        return records.filter(e => {
            for (let filter of filtersSet) {
                if (!filter(e)) {
                    return false
                }
            }
            return true
        })
    }

    private updateFilters(newFilters: ((record: SpeciesRecord) => boolean)[]) {
        // TODO: prevent duplicate logic
        let filteredRecords = this.excludeSpecies(Array.from(this.state.species.values()), newFilters)
        this.setState({
            filters: newFilters,
            data: fillClassifications(filteredRecords),
        })
    }

    handleCloseViewModal() {
        this.setState({
            showDetails: false,
            selectedSpeciesId: null,
        })
    }

    handleCloseEditModal() {
        this.setState({
            showEdit: false,
            selectedSpeciesId: null,
        })
    }
}
