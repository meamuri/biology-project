import React from 'react'
import { Species } from './Species'
import { TaxonProps } from './taxon-props'
import { SpeciesTaxon } from '../../lib/taxon'
import Table from 'react-bootstrap/Table'
import { TableActions } from '../core/types'

type FamilyComponentProps = TaxonProps & { handleSelectSpecies: (id: string, forAction: TableActions) => void }

export const Family: React.FC<FamilyComponentProps> = (props) => {
    let species = props.children.map(e => <Species
        id={e.id}
        key={e.id}
        name={e.name}
        ruLocaleName={e.ruLocaleName}
        children={[]}
        frequency={(e as SpeciesTaxon).frequency}
        handleSelectSpecies={props.handleSelectSpecies}
    />);
    return (
        <Table className="table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col" colSpan={6}>{props.name}</th>
                </tr>
            </thead>
            <tbody>
                {species}
            </tbody>
        </Table>
    )
};
