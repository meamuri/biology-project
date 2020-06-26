import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FilterPredicate } from '../core/types'
import { BiomorphFilter } from './biomorph'
import { FamiliesFilter } from './FamiliesFilter'
import { ComplexesFilter } from './ComplexesFilter'
import { HydrophileFilter } from './HydrophileFilter'
import { CoenoticFilter } from './CoenoticFilter'
import { FrequencyFilter } from './FrequencyFilter'

type FilterProps = {
    handleFiltersChanged: (filters: (FilterPredicate)[]) => void,
    familiesList: Set<string>,
    count: number,
}

type PossibleFilters = 'frequencyFilter' |
    'biomorphFilter' |
    'familiesFilter' |
    'complexesFilter' |
    'hydrophileFilter' |
    'coenoticFilter'

type Filters = Map<PossibleFilters, FilterPredicate>

type FilterState = {
    showHydrophileFilter: boolean,
    showFrequency: boolean,
    showBiomorph: boolean,
    showCoenoticFilter: boolean,
    showComplexesFilter: boolean,
    allSelected: boolean,
    requireFilterReset: boolean,
    selected: Set<string>,
    filters: Filters,
    showFamiliesFilter: boolean,
}

export default class Filter extends React.Component<FilterProps, FilterState> {
    constructor(props: any) {
        super(props)
        this.state = {
            showFrequency: true,
            showBiomorph: true,
            showFamiliesFilter: true,
            showHydrophileFilter: true,
            allSelected: true,
            showComplexesFilter: true,
            showCoenoticFilter: true,
            requireFilterReset: true,
            selected: new Set<string>(),
            filters: new Map<PossibleFilters, FilterPredicate>(),
        }
    }

    render(): React.ReactElement {
        return (
            <>
                <Card>
                    <Card.Header>
                        {`Всего видов: ${this.props.count}`}
                    </Card.Header>
                </Card>
                <Card>
                    <Card.Header>
                        <Button onClick={() => this.cleanFilters()} variant="info">Сбросить фильтры</Button>
                    </Card.Header>
                </Card>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleShow('showFrequency')}}>
                            Природоохранный статус
                    </Card.Header>
                    { this.state.showFrequency && <Card.Body>
                        <FrequencyFilter
                            requireFilterReset={this.state.requireFilterReset}
                            handleFilterChanged={filter => {this.setFilterFor('frequencyFilter', filter)}}
                        />
                    </Card.Body> }
                </Card>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleShow('showBiomorph')}}>
                            Жизненная форма
                    </Card.Header>
                    { this.state.showBiomorph && <Card.Body>
                        <BiomorphFilter
                            requireFilterReset={this.state.requireFilterReset}
                            handleFilterChanged={filter => {this.setFilterFor('biomorphFilter', filter)}}
                        />
                    </Card.Body> }
                </Card>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleShow('showComplexesFilter')}}>
                        По отношению к почве
                    </Card.Header>
                    { this.state.showComplexesFilter && <Card.Body>
                        <ComplexesFilter
                            requireFilterReset={this.state.requireFilterReset}
                            handleFilterChanged={filter => {this.setFilterFor('complexesFilter', filter)}}
                        />
                    </Card.Body> }
                </Card>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleShow('showHydrophileFilter')}}>
                        По отношению к влаге
                    </Card.Header>
                    { this.state.showHydrophileFilter && <Card.Body>
                        <HydrophileFilter
                            requireFilterReset={this.state.requireFilterReset}
                            handleFilterChanged={filter => {this.setFilterFor('hydrophileFilter', filter)}}
                        />
                    </Card.Body> }
                </Card>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleShow('showCoenoticFilter')}}>
                        Ценотическая группа
                    </Card.Header>
                    { this.state.showCoenoticFilter && <Card.Body>
                        <CoenoticFilter
                            requireFilterReset={this.state.requireFilterReset}
                            handleFilterChanged={filter => {this.setFilterFor('coenoticFilter', filter)}}
                        />
                    </Card.Body> }
                </Card>
                <Card>
                    <Card.Header style={{cursor: 'pointer'}} onClick={() => {this.toggleShow('showFamiliesFilter')}}>
                            Семейство
                    </Card.Header>
                    { this.state.showFamiliesFilter && <Card.Body>
                        <FamiliesFilter
                            requireFilterReset={this.state.requireFilterReset}
                            handleFiltersChanged={filter => {this.setFilterFor('familiesFilter', filter)}}
                            families={this.props.familiesList}
                        />
                    </Card.Body> }
                </Card>
            </>
        )
    }

    private cleanFilters() {
        this.setState({
            requireFilterReset: true,
            filters: new Map<PossibleFilters, FilterPredicate>()
        })
        this.props.handleFiltersChanged([])
    }

    private toggleShow(fieldName: 'showBiomorph' |
        'showFrequency' | 'showHydrophileFilter' |
        'showFamiliesFilter' | 'showComplexesFilter' |
        'showCoenoticFilter')
    {
        this.setState((state, e) => {
            let prev = state[fieldName]
            return {
                ...state,
                [fieldName]: !prev,
            }
        })
    }

    private setFilterFor(key: PossibleFilters, f: FilterPredicate | undefined) {
        this.setState((prevState, currProps) => {
            let filters = prevState.filters
            if (f) {
                filters.set(key, f)
            } else {
                filters.delete(key)
            }

            this.props.handleFiltersChanged(Array.from(filters.values()))
            return {
                requireFilterReset: false,
                filters
            }
        })
    }
}
