import React, { ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import { SpeciesRecord } from '../../lib/taxon'
import Biomorph, { formToName } from '../../lib/schema/biomorph'

type FilterProps = {
    handleFiltersChanged: (filter: (f: SpeciesRecord) => boolean) => void,
}

type FilterState = {
    allSelected: boolean,
    selected: Set<Biomorph>,
}

export class BiomorphFilter extends React.Component<FilterProps, FilterState> {
    constructor(props: FilterProps) {
        super(props);
        this.state = {
            allSelected: true,
            selected: new Set<Biomorph>(),
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
        let checkboxes = [Biomorph.TREES, Biomorph.HALF_TREES, Biomorph.PERENNIAL_HERBS, Biomorph.HERBS].map(e =>
            <Form.Check
                key={`${this.prefix}-key-${e}`}
                type='checkbox'
                id={`${this.prefix}-id-${e}`}
                label={`${formToName(e)}`}
                checked={this.state.selected.has(e)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => this.handleCheckbox(event, e)}
            />
        )
        return <Form>
            {
                [allCheckbox, ...checkboxes]
            }
        </Form>
    }

    handleCheckbox(event: ChangeEvent<HTMLInputElement>, biomorph: Biomorph) {
        let isChecked = event.target.checked
        let newSelectedSet = this.state.selected
        if (isChecked) {
            newSelectedSet.add(biomorph)
        } else {
            newSelectedSet.delete(biomorph)
        }

        let allSelected = newSelectedSet.size === 0
        this.setState((state, props) => {
            return {
                allSelected,
                selected: newSelectedSet,
            }
        })
        this.props.handleFiltersChanged((f) => {
            if (allSelected) {
                return true
            }
            return f.biomorph ? new Set<Biomorph>(newSelectedSet.keys()).has(f.biomorph) : false
        })
    }

    handleAllCheckbox(event: ChangeEvent<HTMLInputElement>) {
        let isChecked = event.target.checked
        this.setState((state, props) => ({
            selected: isChecked ? new Set<Biomorph>() : state.selected,
            allSelected: true,
        }))
        this.props.handleFiltersChanged(() => true)
    }
}
