import React from 'react';
import {Species} from './Species';
import {Family as FamilyData} from '../taxon';

export const Family: React.FC<FamilyData> = (props) => {
    let species = props.children.map(e => <Species name={e.name} ruLocaleName={e.ruLocaleName} children={void[]} />);
    return (
        <table className="table">
            <thead>
                <tr><th>{props.name}</th></tr>
            </thead>
            <tbody>
                {species}
            </tbody>
        </table>
    )
};
