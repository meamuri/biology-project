import React from 'react';
import './Table.css';

function Table() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Флора</a>
                </div>
            </nav>
        <div className="container">
            <h3>Плауновые</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>Плауновидные</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Плаун годичный</td>
                </tr>
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default Table;
