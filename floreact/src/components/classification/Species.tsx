import React from 'react'
import { SpeciesProps } from './taxon-props'
import { frequencyToLabel, frequencyToDigitSign } from '../../lib/frequency'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { TableActions } from '../core/types'

type SpeciesComponentProps = SpeciesProps & { handleSelectSpecies: (id: string, forAction: TableActions) => void }

export const Species: React.FC<SpeciesComponentProps> = (props) => {
    let label = frequencyToLabel(props.frequency)
    return (
        <tr>
            <td style={{width: '39%'}}>{props.name}</td>
            <td style={{width: '39%'}}>{props.ruLocaleName}</td>
            <td style={{width: '4%'}}><span className={`badge ${label}`}>{frequencyToDigitSign(props.frequency)}</span></td>
            <td
                onClick={e => props.handleSelectSpecies(props.id, 'edit')}
                style={{
                    width: '6%',
                    cursor: 'pointer',
                }}
                title='редактировать'
            >
                <FontAwesomeIcon icon={faEdit} />
            </td>
            <td
                onClick={e => props.handleSelectSpecies(props.id, 'show')}
                style={{
                    width: '6%',
                    cursor: 'pointer',
                }}
                title='подробности'
            >
                <FontAwesomeIcon icon={faEye} />
            </td>
            <td
                onClick={e => props.handleSelectSpecies(props.id, 'map')}
                style={{
                    width: '6%',
                    cursor: 'pointer',
                }}
                title='подробности'
            >
                <FontAwesomeIcon icon={faMapMarker} />
            </td>
        </tr>
    )
}
