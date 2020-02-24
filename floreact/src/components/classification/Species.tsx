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

type SpeciesComponentProps = SpeciesProps & { handleSelectSpecies: (id: string) => void }

export const Species: React.FC<SpeciesComponentProps> = (props) => {
    let label = frequencyToLabel(props.frequency)
    return (
        <tr onClick={e => props.handleSelectSpecies(props.id)}>
            <td style={{width: '35%'}}>{props.name}</td>
            <td style={{width: '35%'}}>{props.ruLocaleName}</td>
            <td style={{width: '30%'}}><span className={`badge ${label}`}>{props.frequency}</span></td>
        </tr>
    )
};
