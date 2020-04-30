import React from 'react'
import { SpeciesProps } from './taxon-props'
import { frequencyToLabel, frequencyToDigitSign } from '../../lib/frequency'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


type SpeciesComponentProps = SpeciesProps & { handleSelectSpecies: (id: string) => void }

export const Species: React.FC<SpeciesComponentProps> = (props) => {
    let label = frequencyToLabel(props.frequency)
    return (
        <tr>
            <td style={{width: '42%'}}>{props.name}</td>
            <td style={{width: '42%'}}>{props.ruLocaleName}</td>
            <td style={{width: '8%'}}><span className={`badge ${label}`}>{frequencyToDigitSign(props.frequency)}</span></td>
            <td
                onClick={e => props.handleSelectSpecies(props.id)}
                style={{
                    width: '8%',
                    cursor: 'pointer',
                }}
            >
                <FontAwesomeIcon icon={faEdit} />
            </td>
        </tr>
    )
};
