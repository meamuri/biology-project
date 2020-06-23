import React, {ChangeEvent} from 'react'
import { SpeciesRecord } from '../../lib/taxon'
import Hydrophile, { toLocaleName } from '../../lib/schema/hydrophilie'
import Form from 'react-bootstrap/Form'

type HydrophileFilterProps = {
    handleFiltersChanged: (filter: (f: SpeciesRecord) => boolean) => void,
}

type HydrophileFilterState = {
    selected: Set<Hydrophile>
}

export class HydrophileFilter extends React.Component<HydrophileFilterProps, HydrophileFilterState> {
    private readonly prefix: string = 'hydrophileFilter'

    constructor(props: HydrophileFilterProps) {
        super(props);
        this.state = {
            selected: new Set<Hydrophile>()
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
        let checkboxes = [Hydrophile.UNDEFINED, Hydrophile.HYDROPHYTE, Hydrophile.HYGROPHYTE, Hydrophile.MESOPHYTE, Hydrophile.SCLEROPHYTE, Hydrophile.XEROPHYTE,
            Hydrophile.MESOXEROPHYTE, Hydrophile.MESOHYGROPHYTE, Hydrophile.MESOHYDROPHYTE, ].map(e =>
            <Form.Check
                key={`${this.prefix}-key-${e}`}
                type='checkbox'
                id={`${this.prefix}-id-${e}`}
                label={toLocaleName(e)}
                checked={this.state.selected.has(e)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => this.handleCheckbox(event, e)}
            />
        )
        return <Form>
            { [ allCheckbox, ...checkboxes] }
        </Form>
    }

    private handleCheckbox(event: ChangeEvent<HTMLInputElement>, hydrophile: Hydrophile) {
        let isChecked = event.target.checked
        let newSelectedSet = this.state.selected
        if (isChecked) {
            newSelectedSet.add(hydrophile)
        } else {
            newSelectedSet.delete(hydrophile)
        }
        this.setState({
            selected: newSelectedSet,
        })
        this.props.handleFiltersChanged(e => {
            if (newSelectedSet.size === 0) {
                return true
            }
            return e.hydrophile ?  new Set<string>(newSelectedSet.values()).has(e.hydrophile) : false
        })
    }

    private handleAllCheckbox(event: ChangeEvent<HTMLInputElement>) {
        this.setState((state, props) => ({
            selected: new Set<Hydrophile>(),
        }))
        this.props.handleFiltersChanged(() => true)
    }
}
