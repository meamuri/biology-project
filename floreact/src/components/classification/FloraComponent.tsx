import React from 'react'
import { Phylum } from './Phylum'
import { PhylumTaxon as PhylumData } from '../../lib/taxon'

type FloraComponentState = { }

type FloraComponentProps = {
    data: PhylumData[],
    handleSelectSpecies: (id: string) => void,
}

export class FloraComponent extends React.Component<FloraComponentProps, FloraComponentState> {
    render(): React.ReactElement | null {
        if (!this.props.data.length) {
            return null
        }

        let flora = this.props.data.map(e => <Phylum
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
}
