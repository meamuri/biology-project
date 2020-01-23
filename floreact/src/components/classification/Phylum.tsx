import React from 'react';
import {Family} from './Family';
import {PhylumTaxon} from '../../lib/taxon';

export const Phylum: React.FC<PhylumTaxon> = (props) => {
    let families = props.children.map(e => <Family name={e.name} children={e.children}/>);
    return (
        <div className="container">
            <h3>{props.name}</h3>
            {families}
        </div>
    )
};
