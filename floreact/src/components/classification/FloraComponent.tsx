import React from 'react'
import { Phylum } from './Phylum'
import { PhylumTaxon as PhylumData } from '../../lib/taxon'
import { TableActions } from '../core/types'

type FloraComponentState = { }

type FloraComponentProps = {
    data: PhylumData[],
    handleSelectSpecies: (id: string, forAction: TableActions) => void,
}

export class FloraComponent extends React.Component<FloraComponentProps, FloraComponentState> {
    render(): React.ReactElement | null {
        if (!this.props.data.length) {
            return null
        }

        let flora = this.props.data.sort(this.compare).map(e => <Phylum
            id={e.id}
            key={e.id}
            name={e.name}
            ruLocaleName={e.ruLocaleName}
            children={e.children}
            handleSelectSpecies={this.props.handleSelectSpecies}
            />
        );
        return (
            <>
                {flora}
            </>
        )
    }

    private compare(a: PhylumData, b: PhylumData) {
        if (a.name < b.name) {
            return -1
        } else if (b.name > a.name) {
            return 1
        } else {
            return 0
        }
    }
}
