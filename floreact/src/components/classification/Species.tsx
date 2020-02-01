import React from 'react';
import { TaxonProps } from './taxon-props';

export const Species: React.FC<TaxonProps> = (props) => {
    return (
        <tr><
            td style={{width: '50%'}}>{props.name}</td>
            <td style={{width: '50%'}}>{props.ruLocaleName}</td>
        </tr>
    )
};
