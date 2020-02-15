import React from 'react';
import { Species } from './Species';
import { TaxonProps } from './taxon-props';

export const Family: React.FC<TaxonProps> = (props) => {
    let species = props.children.map(e => <Species key={e.id} name={e.name} ruLocaleName={e.ruLocaleName} children={[]} />);
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col" colSpan={2}>{props.name}</th>
                    <th scope="col">встречается</th>
                </tr>
            </thead>
            <tbody>
                {species}
            </tbody>
        </table>
    )
};
