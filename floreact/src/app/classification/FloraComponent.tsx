import React from 'react';
import {getData} from '../api';
import {Link} from 'react-router-dom';
import {Phylum} from './Phylum';

export const FloraComponent: React.FC = () => {
    let data = getData();
    let flora = data.map(e => <Phylum name={e.name} children={e.children}/> )
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Flora</Link>
                </div>
            </nav>
            <div className="container">
                {flora}
            </div>
        </div>
    )
};
