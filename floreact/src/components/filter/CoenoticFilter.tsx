import React, {ChangeEvent} from 'react'
import { SpeciesRecord } from '../../lib/taxon'
import Coenotic, { coenoticToLocaleName } from '../../lib/schema/coenotic'
import Form from 'react-bootstrap/Form'

type CoenoticFilterProps = {
    handleFiltersChanged: (filter: (f: SpeciesRecord) => boolean) => void,
}

type CoenoticFilterState = {
    selected: Set<Coenotic>,
}

export class CoenoticFilter extends React.Component<CoenoticFilterProps, CoenoticFilterState> {
    private readonly prefix: string = "coenoticFilter"

    constructor(props: CoenoticFilterProps) {
        super(props)
        this.state = {
            selected: new Set<Coenotic>(),
        }
        this.handleAllCheckbox = this.handleAllCheckbox.bind(this)
    }

    render() {
        let allCheckbox = (<Form.Check
            key={`${this.prefix}-key-ALL`}
            type='checkbox'
            id={`${this.prefix}-id-ALL`}
            label='ВСЕ'
            checked={this.state.selected.size === 0}
            onChange={this.handleAllCheckbox}
        />)
        let checkboxes = [Coenotic.UNDEFINED, Coenotic.STEPPE, Coenotic.MEADOW, Coenotic.FOREST, Coenotic.COASTAL_WATER, Coenotic.MARSHY, Coenotic.WATER, Coenotic.WEEDY,
            Coenotic.EDGE_STEPPE, Coenotic.EDGE_MEADOW_STEPPE, Coenotic.MEADOW_EDGE, Coenotic.MEADOW_STEPPE, ].map(e =>
            <Form.Check
                key={`${this.prefix}-key-${e}`}
                type='checkbox'
                id={`${this.prefix}-id-${e}`}
                label={coenoticToLocaleName(e)}
                checked={this.state.selected.has(e)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => this.handleCheckbox(event, e)}
            />
        )
        return <Form>
            { [ allCheckbox, ...checkboxes] }
        </Form>
    }

    private handleCheckbox(event: ChangeEvent<HTMLInputElement>, coenotic: Coenotic) {
        let isChecked = event.target.checked
        let newSelectedSet = this.state.selected
        if (isChecked) {
            newSelectedSet.add(coenotic)
        } else {
            newSelectedSet.delete(coenotic)
        }
        this.setState({
            selected: newSelectedSet,
        })
        this.props.handleFiltersChanged(e => {
            if (newSelectedSet.size === 0) {
                return true
            }
            return e.coenotic ?  new Set<string>(newSelectedSet.values()).has(e.coenotic) : false
        })
    }

    private handleAllCheckbox(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            selected: new Set<Coenotic>(),
        })
        this.props.handleFiltersChanged(() => true)
    }
}
