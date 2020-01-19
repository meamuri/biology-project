import React from 'react';
import {Species, SpeciesData} from './Species';

export interface FamilyProps {
    family: string,
    species: SpeciesData[],
}

export const Family: React.FC<FamilyProps> = (props) => {
    let species = props.species.map(e => <Species name={e.name} ruLocaleName={e.ruLocaleName}/>);
    return (
        <table className="table">
            <thead>
                <tr><th>{props.family}</th></tr>
            </thead>
            <tbody>
                {species}
            </tbody>
        </table>
    )
};
