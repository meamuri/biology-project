import React, { ChangeEvent } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { signsToFrequency, frequencyToDigitSign } from '../../lib/frequency'
import { SpeciesRecord } from '../../lib/taxon'
import { BiomorphFilter } from './biomorph'
import { FamiliesFilter } from './FamiliesFilter'
import { ComplexesFilter } from './ComplexesFilter'
import { HydrophileFilter } from './HydrophileFilter'

type FilterProps = {
    handleFiltersChanged: (filters: ((f: SpeciesRecord) => boolean)[]) => void,
    familiesList: Set<string>,
}

type FilterPredicate = (s: SpeciesRecord) => boolean

type FilterState = {
    showHydrophileFilter: boolean,
    showFrequency: boolean,
    showBiomorph: boolean,
    showComplexesFilter: boolean,
    allSelected: boolean,
    selected: Set<string>,
    frequenciesSigns: {[s: string]: string},
    frequencyFilter: FilterPredicate,
    biomorphFilter: FilterPredicate,
    familiesFilter: FilterPredicate,
    complexesFilter: FilterPredicate,
    hydrophileFilter: FilterPredicate,
    showFamiliesFilter: boolean,
}

export default class Filter extends React.Component<FilterProps, FilterState> {
    private readonly prefix: string = 'frequency-filter'

    constructor(props: any) {
        super(props)
        this.state = {
            showFrequency: true,
            showBiomorph: true,
            showFamiliesFilter: true,
            showHydrophileFilter: true,
            allSelected: true,
            showComplexesFilter: true,
            selected: new Set<string>(),
            frequenciesSigns: signsToFrequency(),
            frequencyFilter: () => true,
            biomorphFilter: () => true,
            familiesFilter: () => true,
            complexesFilter: () => true,
            hydrophileFilter: () => true,
        }
        this.handleAllCheckbox = this.handleAllCheckbox.bind(this)
        this.handleBiomorphFilter = this.handleBiomorphFilter.bind(this)
        this.handleFamiliesFilter = this.handleFamiliesFilter.bind(this)
        this.handleHydrophileFilter = this.handleHydrophileFilter.bind(this)
        this.handleComplexesFilter = this.handleComplexesFilter.bind(this)
    }

    render(): React.ReactElement {
        let allCheckbox = (
            <Form.Check
                key={`${this.prefix}-key-ALL`}
                type='checkbox'
                id={`${this.prefix}-id-ALL`}
                label='ВСЕ'
                checked={this.state.selected.size === 0}
                onChange={this.handleAllCheckbox}
            />
        );
        let signs = Object.keys(this.state.frequenciesSigns)
        let checkboxes = signs.map(e =>
            <Form.Check
                key={`${this.prefix}-key-${e}`}
                type='checkbox'
                id={`${this.prefix}-id-${e}`}
                label={`${e}`}
                checked={this.state.selected.has(e)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => this.handleFrequencyCheckbox(event, e)}
            />
        )
        return (
            <>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleFrequency()}}>
                            Природоохранный статус
                    </Card.Header>
                    { this.state.showFrequency && <Card.Body>
                        <Form>
                            {[allCheckbox, ...checkboxes]}
                        </Form>
                    </Card.Body> }
                </Card>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleBiomorph()}}>
                            Жизненная форма
                    </Card.Header>
                    { this.state.showBiomorph && <Card.Body>
                        <BiomorphFilter
                            handleFiltersChanged={this.handleBiomorphFilter}
                        />
                    </Card.Body> }
                </Card>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleComplexes()}}>
                        Эколого-флористический комплекс
                    </Card.Header>
                    { this.state.showComplexesFilter && <Card.Body>
                        <ComplexesFilter
                            handleFiltersChanged={this.handleComplexesFilter}
                        />
                    </Card.Body> }
                </Card>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleHydrophile()}}>
                        По отношению к влаге
                    </Card.Header>
                    { this.state.showHydrophileFilter && <Card.Body>
                        <HydrophileFilter
                            handleFiltersChanged={this.handleHydrophileFilter}
                        />
                    </Card.Body> }
                </Card>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleFamilies()}}>
                            Семейство
                    </Card.Header>
                    { this.state.showFamiliesFilter && <Card.Body>
                        <FamiliesFilter
                            handleFiltersChanged={this.handleFamiliesFilter}
                            families={this.props.familiesList}
                        />
                    </Card.Body> }
                </Card>
            </>
        )
    }

    private toggleBiomorph() {
        this.setState((state, e) => {
            return {
                showBiomorph: !state.showBiomorph,
            }
        })
    }

    private toggleFrequency() {
        this.setState((state, e) => {
            return {
                showFrequency: !state.showFrequency,
            }
        })
    }

    private toggleComplexes() {
        this.setState((state, e) => {
            return {
                showComplexesFilter: !state.showComplexesFilter,
            }
        })
    }

    private toggleHydrophile() {
        this.setState((state, e) => {
            return {
                showHydrophileFilter: !state.showHydrophileFilter,
            }
        })
    }

    private toggleFamilies() {
        this.setState((state, e) => {
            return {
                showFamiliesFilter: !state.showFamiliesFilter,
            }
        })
    }

    private handleBiomorphFilter(f: (s: SpeciesRecord) => boolean) {
        this.setState({
            biomorphFilter: f,
        })
        this.updateFilters(f, this.state.frequencyFilter, this.state.familiesFilter, this.state.complexesFilter, this.state.hydrophileFilter)
    }

    private handleFamiliesFilter(f: (s: SpeciesRecord) => boolean) {
        this.setState({
            familiesFilter: f,
        })
        this.updateFilters(this.state.biomorphFilter, this.state.frequencyFilter, f, this.state.complexesFilter, this.state.hydrophileFilter)
    }

    private handleHydrophileFilter(f: (s: SpeciesRecord) => boolean) {
        this.setState({
            hydrophileFilter: f,
        })
        this.updateFilters(this.state.biomorphFilter, this.state.frequencyFilter, this.state.familiesFilter, this.state.complexesFilter, f)
    }

    private handleComplexesFilter(f: (s: SpeciesRecord) => boolean) {
        this.setState({
            complexesFilter: f,
        })
        this.updateFilters(this.state.biomorphFilter, this.state.frequencyFilter, this.state.familiesFilter, f, this.state.hydrophileFilter)
    }

    handleAllCheckbox(event: ChangeEvent<HTMLInputElement>) {
        let isChecked = event.target.checked
        let frequencyFilter = () => true
        this.setState((state, props) => ({
            selected: isChecked ? new Set<string>() : state.selected,
            allSelected: true,
            frequencyFilter,
        }))
        this.updateFilters(this.state.biomorphFilter, frequencyFilter, this.state.familiesFilter, this.state.complexesFilter, this.state.hydrophileFilter)
    }

    handleFrequencyCheckbox(event: ChangeEvent<HTMLInputElement>, n: string) {
        let isChecked = event.target.checked
        let newSelectedSet = this.state.selected
        if (isChecked) {
            newSelectedSet.add(n)
        } else {
            newSelectedSet.delete(n)
        }

        let handler = newSelectedSet.size === 0 ?
            () => true :
            (e: SpeciesRecord) => {
                let copyOfState = new Set<string>(newSelectedSet.keys())
                return copyOfState.has(frequencyToDigitSign(e.frequency!))
            }

        this.setState((state, props) => {
            return {
                allSelected: newSelectedSet.size === 0,
                selected: newSelectedSet,
                frequencyFilter: handler,
            }
        })

        this.updateFilters(this.state.biomorphFilter, handler, this.state.familiesFilter, this.state.complexesFilter, this.state.hydrophileFilter)
    }

    private updateFilters(biomorphFilter: FilterPredicate,
                          frequencyFilter: FilterPredicate,
                          familiesFilter: FilterPredicate,
                          complexesFilter: FilterPredicate,
                          hydrophileFilter: FilterPredicate) {
        this.props.handleFiltersChanged([
            biomorphFilter,
            frequencyFilter,
            familiesFilter,
            complexesFilter,
            hydrophileFilter,
        ])
    }
}
