import React from 'react';
import {SpeciesTaxon} from '../../lib/taxon';

export const Species: React.FC<SpeciesTaxon> = (props) => {
    return (
        <tr><
            td style={{width: '50%'}}>{props.name}</td>
            <td style={{width: '50%'}}>{props.ruLocaleName}</td>
        </tr>
    )
};
