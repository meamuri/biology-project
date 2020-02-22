import React from 'react';
import { Link } from 'react-router-dom';
import { FloraComponent } from './classification/FloraComponent';
import Nav from 'react-bootstrap/Nav'

export default class Classification extends React.Component<any, any> {
    render(): React.ReactElement {
        return (
            <>
                <Nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Flora</Link>
                    </div>
                </Nav>
                <div className="container">
                    <FloraComponent/>
                </div>
            </>
        )
    }
}
