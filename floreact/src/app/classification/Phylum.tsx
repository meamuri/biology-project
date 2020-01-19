import React from 'react';
import {Family, FamilyProps} from './Family';

export interface PhylumData {
    name: string,
    families: FamilyProps[]
}

export const Phylum: React.FC<PhylumData> = (props) => {
    let families = props.families.map(e => <Family family={e.family} species={e.species}/>)
    return (
        <div className="container">
            <h3>{props.name}</h3>
            {families}
        </div>
    )
};
