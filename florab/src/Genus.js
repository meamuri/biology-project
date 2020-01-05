
import React from 'react';

function Genus(name, species) {
    let rows = species.map((e) =>
        <tr>
            <td>{e.name}</td>
            <td>{e.description}</td>
        </tr>
    );
    let header = <tr><th>{name}</th></tr>;
    return (
        <table>
            {header}
            {rows}
        </table>
    );
}

export default Genus;
