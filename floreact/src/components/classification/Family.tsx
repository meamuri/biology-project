import React from 'react';
import {Species} from './Species';
import {FamilyTaxon} from '../../lib/taxon';

export const Family: React.FC<FamilyTaxon> = (props) => {
    let species = props.children.map(e => <Species id={e.id} key={e.id} name={e.name} ruLocaleName={e.ruLocaleName} children={void[]} />);
    return (
        <table className="table table-bordered">
            <thead>
                <tr><th scope="col" colSpan={2}>{props.name}</th></tr>
            </thead>
            <tbody>
                {species}
            </tbody>
        </table>
    )
};
