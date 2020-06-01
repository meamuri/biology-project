import React, { ChangeEvent } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { signsToFrequency, frequencyToDigitSign } from '../../lib/frequency'
import { SpeciesRecord } from '../../lib/taxon'
import { BiomorphFilter } from './biomorph'

type FilterProps = {
    handleFiltersChanged: (filters: ((f: SpeciesRecord) => boolean)[]) => void,
}

type FilterPredicate = (s: SpeciesRecord) => boolean

type FilterState = {
    allSelected: boolean,
    selected: Set<string>,
    frequenciesSigns: {[s: string]: string},
    frequencyFilter: FilterPredicate,
    biomorphFilter: FilterPredicate,
}

export default class Filter extends React.Component<FilterProps, FilterState> {
    private readonly prefix: string = 'frequency-filter'

    constructor(props: any) {
        super(props)
        this.state = {
            allSelected: true,
            selected: new Set<string>(),
            frequenciesSigns: signsToFrequency(),
            frequencyFilter: () => true,
            biomorphFilter: () => true,
        }
        this.handleAllCheckbox = this.handleAllCheckbox.bind(this)
        this.handleBiomorphFilter = this.handleBiomorphFilter.bind(this)
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
                    <Card.Header>
                            Природоохранный статус
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            {[allCheckbox, ...checkboxes]}
                        </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                            Биологическая форма
                    </Card.Header>
                    <Card.Body>
                        <BiomorphFilter
                            handleFiltersChanged={this.handleBiomorphFilter}
                        />
                    </Card.Body>
                </Card>
            </>
        )
    }

    private handleBiomorphFilter(f: (s: SpeciesRecord) => boolean) {
        this.setState({
            biomorphFilter: f,
        })
        this.updateFilters(f, this.state.frequencyFilter)
    }

    handleAllCheckbox(event: ChangeEvent<HTMLInputElement>) {
        let isChecked = event.target.checked
        let frequencyFilter = () => true
        this.setState((state, props) => ({
            selected: isChecked ? new Set<string>() : state.selected,
            allSelected: true,
            frequencyFilter,
        }))
        this.updateFilters(this.state.biomorphFilter, frequencyFilter)
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

        this.updateFilters(this.state.biomorphFilter, handler)
    }

    private updateFilters(biomorphFilter: FilterPredicate, frequencyFilter: FilterPredicate) {
        this.props.handleFiltersChanged([
            biomorphFilter,
            frequencyFilter,
        ])
    }
}
