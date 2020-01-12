import React from 'react';
import './Table.css';

function Table() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Flora</a>
                </div>
            </nav>
        <div className="container">
            <h3>Плауновидные</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>Плауновые</th><th>Lycopodiaceae</th>
                </tr>
                </thead>
                <tbody>
                <tr><td>Плаунок топяной</td><td>Lycopodiella inundata (L.) Holub</td></tr>
                <tr><td>Плаун годичный</td><td>Lycopodium annotinum L.</td></tr>
                <tr><td>Плаун булавовидный</td><td>Lycopodium clavatum L.</td></tr>
                <tr><td>Плаун сплюснутый</td><td>Lycopodium complanatum L.</td></tr>
                </tbody>
            </table>

            <h3>Папоротниковидные</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>Оноклеевые</th><th>Onocleaceae</th>
                </tr>
                </thead>
                <tbody>
                <tr><td>Страусник обыкновенный</td><td>Matteuccia strutiopteris (L.) Tod</td></tr>
                </tbody>
            </table>

            <table className="table">
                <thead>
                <tr>
                    <th>Ужовниковые</th><th>Ophioglossaceae</th>
                </tr>
                </thead>
                <tbody>
                <tr><td>Гроздовник полулунный</td><td>Botrychium lunaria (L.) Sw.</td></tr>
                <tr><td>Гроздовник многораздельный</td><td>Botrychium multifidum (S.G. Gmel.) Rupr.</td></tr>
                <tr><td>Гроздовник виргинский</td><td>Botrychium virginianum (L.) Sw.</td></tr>
                <tr><td>Ужовник обыкновенный</td><td>Ophioglossum vulgatum L.</td></tr>
                </tbody>
            </table>

            <table className="table">
                <thead>
                <tr>
                    <th>Многоножковые</th><th>Polypodiaceae</th>
                </tr>
                </thead>
                <tbody>
                <tr><td>Многоножка обыкновенная</td><td>Polypodium vulgare L.</td></tr>
                </tbody>
            </table>

        </div>
        </div>
    );
}

export default Table;
