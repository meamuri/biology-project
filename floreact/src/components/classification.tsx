import React from 'react'
import { FloraComponent } from './classification/FloraComponent'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Login from './login'
import EditSpeciesModal from './edit-modal'
import { getApiData, getSpecies } from '../lib/api'
import { PhylumTaxon } from '../lib/taxon'
import { FloraClassification, initClassification } from './classification/schema'

type AppState =
    { [key: string]: any } &
    {
        data: PhylumTaxon[],
        classification: FloraClassification,
        selectedSpeciesId?: string,
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
            data: [],
            classification: initClassification(),
        }
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
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
            classification.phylums.species.add(s.id)
            classification.phylums.families.add(s.id)
            classification.phylums.items[s.phylum.id] = (s.phylum)

            classification.families.species.add(s.id)
            classification.families.items[s.family.id] = (s.family)

            classification.species[s.id] = s
        }
        this.setState({ classification })
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

                <FloraComponent data={this.state.data}/>

            </div>
                {this.state.show &&
                <Login show={this.state.show}
                       handleModalClose={this.handleModalClose}
                       handleSuccessfulLogin={this.handleSuccessfulLogin}
                /> }
                {this.state.selectedSpeciesId &&
                <EditSpeciesModal
                    show={this.state.selectedSpeciesId !== null}
                    species={this.state.classification.species[this.state.selectedSpeciesId]}
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
        localStorage.setItem("token", token)
        localStorage.setItem("user", username)
        this.setState({
            user: username,
            token,
        })
    }
}
