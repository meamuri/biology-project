import React from 'react'
import { SpeciesProps } from './taxon-props'
import { describeFrequency , FREQUENCY } from '../../lib/frequency'

function frequencyToLabel(frequency: FREQUENCY) {
    switch (frequency) {
        case 'DISAPPEARED':
        case 'ENDANGERED':
            return "badge-danger";
        case 'SHRINKING':
        case "RARE":
            return "badge-warning";
        case "RECOVERING":
            return "badge-success";
        case 'UNDEFINED':
        default:
            return "badge-secondary";
    }
}

type SpeciesComponentProps = SpeciesProps & { handleSelectSpecies: (id: string) => void }

export const Species: React.FC<SpeciesComponentProps> = (props) => {
    let label = frequencyToLabel(props.frequency)
    return (
        <tr onClick={e => props.handleSelectSpecies(props.id)}>
            <td style={{width: '40%'}}>{props.name}</td>
            <td style={{width: '40%'}}>{props.ruLocaleName}</td>
            <td style={{width: '20%'}}><span className={`badge ${label}`}>{describeFrequency(props.frequency)}</span></td>
        </tr>
    )
};
