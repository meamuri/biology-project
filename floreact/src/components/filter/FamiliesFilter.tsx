import React, {ChangeEvent} from 'react'
import Form from 'react-bootstrap/Form'
import { SpeciesRecord } from '../../lib/taxon'

type FamiliesFilterProps = {
    handleFiltersChanged: (filter: (f: SpeciesRecord) => boolean) => void,
    families: Set<string>
}

type FamiliesFilterState = {
    selected: Set<string>,
}

export class FamiliesFilter extends React.Component<FamiliesFilterProps, FamiliesFilterState>{
    constructor(props: FamiliesFilterProps) {
        super(props);
        this.state = {
            selected: new Set(),
        }
        this.handleAllCheckbox = this.handleAllCheckbox.bind(this)
    }

    private readonly prefix: string = "familiesFilter"

    render() {
        let allCheckbox = (<Form.Check
            key={`${this.prefix}-key-ALL`}
            type='checkbox'
            id={`${this.prefix}-id-ALL`}
            label='ВСЕ'
            checked={this.state.selected.size === 0}
            onChange={this.handleAllCheckbox}
        />)
        let checkboxes = Array.from(this.props.families).map(e =>
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
        </Form>
    }

    handleCheckbox(event: ChangeEvent<HTMLInputElement>, familyName: string) {
        let isChecked = event.target.checked
        let newSelectedSet = this.state.selected
        if (isChecked) {
            newSelectedSet.add(familyName)
        } else {
            newSelectedSet.delete(familyName)
        }
        this.setState({
            selected: newSelectedSet,
        })
        this.props.handleFiltersChanged(e => {
            if (newSelectedSet.size === 0) {
                return true
            }
            return new Set<string>(newSelectedSet.values()).has(e.family.name)
        })
    }

    handleAllCheckbox(event: ChangeEvent<HTMLInputElement>) {
        this.setState((state, props) => ({
            selected: new Set<string>()
        }))
        this.props.handleFiltersChanged(() => true)
    }
}
