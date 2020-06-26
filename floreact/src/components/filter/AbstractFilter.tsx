import { FilterPredicate } from '../core/types'
import React, { ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import { SpeciesRecord } from "../../lib/taxon"

interface FilterProps<T> {
    handleFilterChanged: (filter: FilterPredicate) => void,
}

interface FilterState<T> {
    selected: Set<T>
}

export abstract class AbstractFilter<T> extends React.Component<FilterProps<T>, FilterState<T>> {
    protected abstract readonly filterKey: string
    protected abstract readonly elements: T[]
    protected abstract extractField(e: SpeciesRecord): T | undefined
    protected abstract localizer(e: T): string

    protected constructor(props: FilterProps<T>) {
        super(props);
        this.state = {
            selected: new Set<T>(),
        }
        this.handleAllCheckbox = this.handleAllCheckbox.bind(this)
    }

    render() {
        return <Form>
            {[this.generateCheckbox(), ...this.generateCheckboxes()]}
        </Form>;
    }

    private generateCheckbox() {
        return <Form.Check
            key={`${this.filterKey}-key-ALL`}
            type='checkbox'
            id={`${this.filterKey}-id-ALL`}
            label='Все'
            checked={this.state.selected.size === 0}
            onChange={this.handleAllCheckbox}
        />
    }

    private generateCheckboxes() {
        return this.elements.map(e =>
            <Form.Check
                key={`${this.filterKey}-key-${e}`}
                type='checkbox'
                id={`${this.filterKey}-id-${e}`}
                label={this.localizer(e)}
                checked={this.state.selected.has(e)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => this.handleCheckbox(event, e)}
            />
        )
    }


    protected handleCheckbox(event: ChangeEvent<HTMLInputElement>, element: T) {
        let isChecked = event.target.checked
        let newSelectedSet = this.state.selected
        if (isChecked) {
            newSelectedSet.add(element)
        } else {
            newSelectedSet.delete(element)
        }
        this.setState({
            selected: newSelectedSet,
        })
        this.props.handleFilterChanged(e => {
            if (newSelectedSet.size === 0) {
                return true
            }
            let field = this.extractField(e)
            return field ? new Set<T>(newSelectedSet.values()).has(field) : false
        })
    }

    protected handleAllCheckbox(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            selected: new Set<T>(),
        })
        this.props.handleFilterChanged(() => true)
    }
}
