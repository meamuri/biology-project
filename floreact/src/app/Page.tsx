
import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

export class Page extends React.Component {
    render() {
        return <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Flora</Link>
                </div>
            </nav>
            <div className="container">

            </div>
        </div>;
    }
}
