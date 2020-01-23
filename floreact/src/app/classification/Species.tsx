import React from 'react';
import {SpeciesTaxon} from '../taxon';

export const Species: React.FC<SpeciesTaxon> = (props) => {
    return (
        <tr><td>{props.name}</td><td>{props.ruLocaleName}</td></tr>
    )
};
