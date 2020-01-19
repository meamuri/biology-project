import React from 'react';
import {Family} from './Family';
import {Phylum as PhylumData} from '../taxon';

export const Phylum: React.FC<PhylumData> = (props) => {
    let families = props.children.map(e => <Family name={e.name} children={e.children}/>);
    return (
        <div className="container">
            <h3>{props.name}</h3>
            {families}
        </div>
    )
};
