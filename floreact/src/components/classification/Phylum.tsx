import React from 'react';
import { Family } from './Family';
import { TaxonProps } from './taxon-props';

export const Phylum: React.FC<TaxonProps> = (props) => {
    let families = props.children.map(e => <Family key={e.id} name={e.name} children={e.children}/>);
    return (
        <div className="mt-3">
            <h3 className="mt-1">{props.name}</h3>
            {families}
        </div>
    )
};
