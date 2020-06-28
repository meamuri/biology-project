import React, {FormEvent} from 'react'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {SpeciesRecord} from '../../lib/taxon'
import FloraApiClient from '../../lib/api'
import {describeFrequency, FREQUENCY, toFrequency} from '../../lib/frequency'
import Biomorph, {formToName, stringToBiomorph} from '../../lib/schema/biomorph'
import {getAreals} from '../../lib/schema/areal'
import Complexes, {toComplex, toLocaleName} from '../../lib/schema/complexes'
import Hydrophile, {toHydrophile, toLocaleName as hydrophileToLocaleName} from '../../lib/schema/hydrophilie'
import Coenotic, {coenoticToLocaleName, toCoenotic} from '../../lib/schema/coenotic'

type EditSpeciesModalProps = {
    user?: string,
    species: SpeciesRecord,
    show: boolean,
    handleCloseEditModal: () => void,
    handleSuccessfulUpdateSpeciesInfo: (changes: { description: string, frequency: FREQUENCY }) => void,
    token: string,
    httpClient: FloraApiClient,
}

type EditSpeciesState = {
    currentBiomorph: Biomorph | undefined,
    currentFrequency: FREQUENCY,
    currentComplex: Complexes,
    currentHydrophile: Hydrophile,
    currentCoenotic: Coenotic | undefined,
    description: string,
    initialDescription: string,

    initialAreal: string,
    currentAreal: string,
}

export default class EditSpeciesModal extends React.Component<EditSpeciesModalProps, EditSpeciesState> {

    private readonly ifBiomorphEmpty = 'Неизвестная форма'
    private readonly ifArealEmpty = 'Неизвестный'

    constructor(props: EditSpeciesModalProps) {
        super(props)
        this.state = {
            currentBiomorph: props.species.biomorph,
            currentFrequency: props.species.frequency || 'UNDEFINED',
            currentComplex: props.species.complex || Complexes.UNKNOWN,
            currentHydrophile: props.species.hydrophile || Hydrophile.UNDEFINED,
            currentCoenotic: props.species.coenotic,
            initialDescription: props.species.description || '',
            description: props.species.description || '',
            initialAreal: props.species.areal || '',
            currentAreal: props.species.areal || ''
        }
        this.handleBiomorphChange = this.handleBiomorphChange.bind(this)
        this.handleFormInput = this.handleFormInput.bind(this)
        this.handleOkButton = this.handleOkButton.bind(this)
        this.handleComplexChanged = this.handleComplexChanged.bind(this)
        this.handleFrequencyChange = this.handleFrequencyChange.bind(this)
        this.handleHydrophile = this.handleHydrophile.bind(this)
        this.handleCoenotic = this.handleCoenotic.bind(this)
        this.handleAreal = this.handleAreal.bind(this)
    }

    render() {
        let isFieldsChanged = this.state.currentFrequency !== this.props.species.frequency ||
            this.state.initialDescription !== this.state.description ||
            this.state.currentComplex !== this.props.species.complex ||
            this.state.currentBiomorph !== this.props.species.biomorph ||
            this.state.currentHydrophile !== this.props.species.hydrophile ||
            this.state.currentCoenotic !== this.props.species.coenotic ||
            this.state.currentAreal !== this.state.initialAreal
        let editingDisabled = !isFieldsChanged || !this.props.user
        return <Modal show={this.props.show} size="lg"
            onHide={this.props.handleCloseEditModal}
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
                            <Form.Control plaintext readOnly defaultValue={this.props.species.name} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Русское название
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.species.ruLocaleName} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Описание
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control as='textarea' rows="8" onChange={this.handleFormInput} defaultValue={this.state.initialDescription} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Встречаемость
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control as="select" onChange={this.handleFrequencyChange} defaultValue={this.state.currentFrequency}>
                            {['DISAPPEARED', 'ENDANGERED', 'SHRINKING', 'RARE', 'RECOVERING', 'UNDEFINED'].map((frequency, i) =>
                                <option value={frequency} key={i}>{describeFrequency(frequency)}</option>
                            )}
                        </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formSelectBiomorph">
                        <Form.Label column sm="4">
                            Жизненная форма
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control as="select" onChange={this.handleBiomorphChange} defaultValue={this.state.currentBiomorph ? this.state.currentBiomorph : this.ifBiomorphEmpty }>
                            {[this.ifBiomorphEmpty, 'PERENNIAL_HERBS', 'HERBS', 'HALF_TREES', 'TREES'].map((biomorph, i) =>
                                <option value={biomorph} key={i}>{formToName(biomorph) || biomorph}</option>
                            )}
                        </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formSelectComplex">
                        <Form.Label column sm="4">
                            По отношению к почве
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control as="select" onChange={this.handleComplexChanged} defaultValue={this.state.currentComplex ? this.state.currentComplex : Complexes.UNKNOWN }>
                            {[Complexes.UNKNOWN, Complexes.CALCIPHILES, Complexes.HALOPHILES, Complexes.PSAMOPHILES, ].map((complex, i) =>
                                <option value={complex} key={complex}>{toLocaleName(complex)}</option>
                            )}
                        </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formSelectHydrophile">
                        <Form.Label column sm="4">
                            Отношение к влаге
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control as="select" onChange={this.handleHydrophile} defaultValue={this.state.currentHydrophile ? this.state.currentHydrophile : Hydrophile.UNDEFINED }>
                            {[Hydrophile.UNDEFINED, Hydrophile.HYDROPHYTE, Hydrophile.HYGROPHYTE, Hydrophile.MESOPHYTE, Hydrophile.SCLEROPHYTE, Hydrophile.XEROPHYTE,
                            Hydrophile.MESOXEROPHYTE, Hydrophile.MESOHYGROPHYTE, Hydrophile.MESOHYDROPHYTE, ].map((complex, i) =>
                                <option value={complex} key={complex}>{hydrophileToLocaleName(complex)}</option>
                            )}
                        </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formSelectCoenotic">
                        <Form.Label column sm="4">
                            Ценотическая группа
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control as="select" onChange={this.handleCoenotic} defaultValue={this.state.currentCoenotic ? this.state.currentCoenotic : Coenotic.UNDEFINED }>
                            {[Coenotic.UNDEFINED, Coenotic.STEPPE, Coenotic.MEADOW, Coenotic.FOREST, Coenotic.COASTAL_WATER, Coenotic.MARSHY, Coenotic.WATER, Coenotic.WEEDY,
                            Coenotic.EDGE_STEPPE, Coenotic.EDGE_MEADOW_STEPPE, Coenotic.MEADOW_EDGE, Coenotic.MEADOW_STEPPE, ].map((complex, i) =>
                                <option value={complex} key={complex}>{coenoticToLocaleName(complex)}</option>
                            )}
                        </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formSelectAreal">
                        <Form.Label column sm="4">
                            Занимаемый ареал
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control as="select" onChange={this.handleAreal} defaultValue={this.state.initialAreal || this.ifArealEmpty }>
                            {[this.ifArealEmpty, ...getAreals()].map((areal, i) =>
                                <option value={areal} key={areal}>{areal}</option>
                            )}
                        </Form.Control>
                        </Col>
                    </Form.Group>
                </Form>
                {!this.props.user && <Alert variant="danger">
                    Пожалуйста, войдите в систему чтобы осуществлять редактирование данных
                </Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleCloseEditModal}>
                    Отмена
                </Button>
                <Button disabled={editingDisabled}
                        style={{cursor: editingDisabled ? 'default' : 'pointer' }}
                        variant="primary"
                        onClick={this.handleOkButton}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    }

    private handleCoenotic(event: FormEvent<HTMLInputElement>) {
        let coenotic = toCoenotic(event.currentTarget.value)
        coenotic && this.setState({
            currentCoenotic: coenotic,
        })
    }

    private handleHydrophile(event: FormEvent<HTMLInputElement>) {
        this.setState({
            currentHydrophile: toHydrophile(event.currentTarget.value),
        })
    }

    private handleComplexChanged(event: FormEvent<HTMLInputElement>) {
        this.setState({
            currentComplex: toComplex(event.currentTarget.value),
        })
    }

    handleFrequencyChange(event: FormEvent<HTMLInputElement>) {
        this.setState({
            currentFrequency: toFrequency(event.currentTarget.value),
        })
    }

    handleBiomorphChange(event: FormEvent<HTMLInputElement>) {
        this.setState({
            currentBiomorph: stringToBiomorph(event.currentTarget.value) || undefined,
        })
    }

    private handleAreal(event: FormEvent<HTMLInputElement>) {
        let value = event.currentTarget.value;
        this.setState({
            currentAreal: (value === this.ifArealEmpty ? '' : value),
        })
    }

    handleFormInput(event: FormEvent<HTMLInputElement>) {
        event.preventDefault()
        this.setState({
            description: event.currentTarget.value,
        })
    }

    async handleOkButton() {
        let changes = {
            description: this.state.description,
            frequency: this.state.currentFrequency,
            biomorph: this.state.currentBiomorph,
            complex: this.state.currentComplex || Complexes.UNKNOWN,
            hydrophile: this.state.currentHydrophile,
            coenotic: this.state.currentCoenotic || undefined,
            areal: this.state.currentAreal || null
        }
        console.log(changes)
        await this.props.httpClient.updateSpecies(
            this.props.species.id,
            changes)
        this.props.handleSuccessfulUpdateSpeciesInfo(changes)
    }

}
