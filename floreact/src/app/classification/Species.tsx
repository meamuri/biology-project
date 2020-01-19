import React from 'react';
import {Species as SpeciesData} from '../taxon';

export const Species: React.FC<SpeciesData> = (props) => {
    return (
        <tr><td>{props.name}</td><td>{props.ruLocaleName}</td></tr>
    )
}
