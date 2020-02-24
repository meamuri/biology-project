import React from 'react';
import { Family } from './Family';
import { TaxonProps } from './taxon-props';

type PhylumComponentProps = TaxonProps & { handleSelectSpecies: (id: string) => void }

export const Phylum: React.FC<PhylumComponentProps> = (props) => {
    let families = props.children.map(e => <Family
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
