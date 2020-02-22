import React from 'react';
import { Species } from './Species';
import { TaxonProps } from './taxon-props';
import { SpeciesTaxon } from '../../lib/taxon';
import Table from 'react-bootstrap/Table'

export const Family: React.FC<TaxonProps> = (props: TaxonProps) => {
    let species = props.children.map(e => <Species
        key={e.id}
        name={e.name}
        ruLocaleName={e.ruLocaleName}
        children={[]}
        frequency={(e as SpeciesTaxon).frequency}
    />);
    return (
        <Table className="table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col" colSpan={3}>{props.name}</th>
                </tr>
            </thead>
            <tbody>
                {species}
            </tbody>
        </Table>
    )
};
