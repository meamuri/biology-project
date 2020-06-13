import React, {ChangeEvent} from 'react'
import {SpeciesRecord} from '../../lib/taxon'
import {Complexes} from '../../lib/schema/complexes/core'
import Form from 'react-bootstrap/Form'

type ComplexesFilterProps = {
    handleFiltersChanged: (filter: (f: SpeciesRecord) => boolean) => void,
}

type ComplexesFilterState = {
    selected: Set<Complexes>
}

export class ComplexesFilter extends React.Component<ComplexesFilterProps, ComplexesFilterState> {
    constructor(props: ComplexesFilterProps) {
        super(props);
        this.state = {
            selected: new Set<Complexes>()
        }
        this.handleAllCheckbox = this.handleAllCheckbox.bind(this)
    }

    private readonly prefix: string = 'biomorphFilter'

    render() {
        let allCheckbox = (<Form.Check
            key={`${this.prefix}-key-ALL`}
            type='checkbox'
            id={`${this.prefix}-id-ALL`}
            label='ВСЕ'
            checked={this.state.selected.size === 0}
            onChange={this.handleAllCheckbox}
        />)
        let checkboxes = [Complexes.UNKNOWN, Complexes.CALCIPHILES, Complexes.HALOPHILES, Complexes.STEPPE, Complexes.PSAMOPHILES, ].map(e =>
            <Form.Check
                key={`${this.prefix}-key-${e}`}
                type='checkbox'
                id={`${this.prefix}-id-${e}`}
                label={e}
                checked={this.state.selected.has(e)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => this.handleCheckbox(event, e)}
            />
        )
        return <Form>
            {
                [allCheckbox, ...checkboxes]
            }
        </Form>;
    }

    private handleCheckbox(event: ChangeEvent<HTMLInputElement>, complex: Complexes) {
        let isChecked = event.target.checked
        let newSelectedSet = this.state.selected
        if (isChecked) {
            newSelectedSet.add(complex)
        } else {
            newSelectedSet.delete(complex)
        }
        this.setState({
            selected: newSelectedSet,
        })
        this.props.handleFiltersChanged(e => {
            if (newSelectedSet.size === 0) {
                return true
            }
            return e.complex ?  new Set<string>(newSelectedSet.values()).has(e.complex) : false
        })
    }

    private handleAllCheckbox(event: ChangeEvent<HTMLInputElement>) {
        this.setState((state, props) => ({
            selected: new Set<Complexes>(),
        }))
        this.props.handleFiltersChanged(() => true)
    }
}
