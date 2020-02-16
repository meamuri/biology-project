import React from 'react';
import { SpeciesProps } from './taxon-props';
import { FREQUENCY } from '../../lib/frequency';

function frequencyToLabel(frequency: FREQUENCY) {
    switch (frequency) {
        case 'LOW':
            return "badge-danger";
        case 'MEDIUM':
            return "badge-warning";
        case 'HIGH':
            return "badge-success";
        default:
            return "badge-secondary";
    }
}

export const Species: React.FC<SpeciesProps> = (props) => {
    let label = frequencyToLabel(props.frequency)
    return (
        <tr><
            td style={{width: '35%'}}>{props.name}</td>
            <td style={{width: '35%'}}>{props.ruLocaleName}</td>
            <td style={{width: '30%'}}><span className={`badge ${label}`}>{props.frequency}</span></td>
        </tr>
    )
};
