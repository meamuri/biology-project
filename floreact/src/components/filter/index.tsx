import React, { ChangeEvent } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { signsToFrequency, frequencyToDigitSign } from '../../lib/frequency'
import { SpeciesRecord } from '../../lib/taxon'
import { BiomorphFilter } from './biomorph'
import { FamiliesFilter } from './FamiliesFilter'

type FilterProps = {
    handleFiltersChanged: (filters: ((f: SpeciesRecord) => boolean)[]) => void,
    familiesList: Set<string>,
}

type FilterPredicate = (s: SpeciesRecord) => boolean

type FilterState = {
    showFrequency: boolean,
    showBiomorph: boolean,
    allSelected: boolean,
    selected: Set<string>,
    frequenciesSigns: {[s: string]: string},
    frequencyFilter: FilterPredicate,
    biomorphFilter: FilterPredicate,
    familiesFilter: FilterPredicate,
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
            allSelected: true,
            selected: new Set<string>(),
            frequenciesSigns: signsToFrequency(),
            frequencyFilter: () => true,
            biomorphFilter: () => true,
            familiesFilter: () => true,
        }
        this.handleAllCheckbox = this.handleAllCheckbox.bind(this)
        this.handleBiomorphFilter = this.handleBiomorphFilter.bind(this)
        this.handleFamiliesFilter = this.handleFamiliesFilter.bind(this)
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
                            Биологическая форма
                    </Card.Header>
                    { this.state.showBiomorph && <Card.Body>
                        <BiomorphFilter
                            handleFiltersChanged={this.handleBiomorphFilter}
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
        this.updateFilters(f, this.state.frequencyFilter, this.state.familiesFilter)
    }

    private handleFamiliesFilter(f: (s: SpeciesRecord) => boolean) {
        this.setState({
            familiesFilter: f,
        })
        this.updateFilters(this.state.biomorphFilter, this.state.frequencyFilter, f)
    }

    handleAllCheckbox(event: ChangeEvent<HTMLInputElement>) {
        let isChecked = event.target.checked
        let frequencyFilter = () => true
        this.setState((state, props) => ({
            selected: isChecked ? new Set<string>() : state.selected,
            allSelected: true,
            frequencyFilter,
        }))
        this.updateFilters(this.state.biomorphFilter, frequencyFilter, this.state.familiesFilter)
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

        this.updateFilters(this.state.biomorphFilter, handler, this.state.familiesFilter)
    }

    private updateFilters(biomorphFilter: FilterPredicate,
                          frequencyFilter: FilterPredicate,
                          familiesFilter: FilterPredicate) {
        this.props.handleFiltersChanged([
            biomorphFilter,
            frequencyFilter,
            familiesFilter,
        ])
    }
}
