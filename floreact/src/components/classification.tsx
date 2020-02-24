import React from 'react'
import { FloraComponent } from './classification/FloraComponent'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Login from './login'
import EditSpeciesModal from './edit-modal'
import { getApiData, getSpecies } from '../lib/api'
import { PhylumTaxon, SpeciesRecord } from '../lib/taxon'
import { FloraClassification, initClassification } from './classification/schema'
import { FREQUENCY } from '../lib/frequency'

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
    constructor(props: any) {
        super(props);
        let user = localStorage.getItem("user")
        let token = localStorage.getItem("token")
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
    }

    async componentDidMount() {
        let response = await getApiData()
        this.setState({ data: response.data })

        let species = await getSpecies()
        if (species === null) {
            return
        }

        let classification: FloraClassification = initClassification()
        for (let s of species) {
            // classification.phylums.species.add(s.id)
            // classification.phylums.families.add(s.id)
            // classification.phylums.items[s.phylum.id] = (s.phylum)
            //
            // classification.families.species.add(s.id)
            // classification.families.items[s.family.id] = (s.family)

            classification.species[s.id] = s
        }
        this.setState({ species: classification.species })
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

                <FloraComponent data={this.state.data} handleSelectSpecies={this.handleSelectSpecies} />

            </div>
                {this.state.show &&
                <Login show={this.state.show}
                       handleModalClose={this.handleModalClose}
                       handleSuccessfulLogin={this.handleSuccessfulLogin}
                /> }
                {this.state.selectedSpeciesId &&
                <EditSpeciesModal
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
        let response = await getApiData()
        let id = this.state.selectedSpeciesId!
        let changedRecord = { ...this.state.species[id], ...changes }
        this.setState((state, props) => ({
            selectedSpeciesId: null,
            data: response.data,
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
