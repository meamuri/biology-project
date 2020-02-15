import React from 'react';
import { TaxonProps } from './taxon-props';

export const Species: React.FC<TaxonProps> = (props) => {
    return (
        <tr><
            td style={{width: '35%'}}>{props.name}</td>
            <td style={{width: '35%'}}>{props.ruLocaleName}</td>
            <td style={{width: '30%'}}><span className="badge badge-warning">часто</span></td>
        </tr>
    )
};
