import React from 'react'
import { SpeciesProps } from './taxon-props'
import { frequencyToLabel, frequencyToDigitSign } from '../../lib/frequency'


type SpeciesComponentProps = SpeciesProps & { handleSelectSpecies: (id: string) => void }

export const Species: React.FC<SpeciesComponentProps> = (props) => {
    let label = frequencyToLabel(props.frequency)
    return (
        <tr onClick={e => props.handleSelectSpecies(props.id)}>
            <td style={{width: '46%'}}>{props.name}</td>
            <td style={{width: '46%'}}>{props.ruLocaleName}</td>
            <td style={{width: '8%'}}><span className={`badge ${label}`}>{frequencyToDigitSign(props.frequency)}</span></td>
        </tr>
    )
};
