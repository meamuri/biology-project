import React from 'react'
import { Family } from './Family'
import { TaxonProps } from './taxon-props'
import { TableActions } from '../core/types'
import { Taxon } from '../../lib/taxon'

type PhylumComponentProps = TaxonProps & { handleSelectSpecies: (id: string, forAction: TableActions) => void }

export const Phylum: React.FC<PhylumComponentProps> = (props) => {
    let families = props.children.sort(compare).map(e => <Family
        id={e.id}
        key={e.id}
        name={e.name}
        children={e.children}
        handleSelectSpecies={props.handleSelectSpecies}
    />);
    return (
        <div className="mt-3">
            <h3 className="mt-1">{props.name}</h3>
            {families}
        </div>
    )
};

function compare(a: Taxon<any>, b: Taxon<any>) {
    if (a.name < b.name) {
        return -1
    } else if (b.name < a.name) {
        return 1
    } else {
        return 0
    }
}
