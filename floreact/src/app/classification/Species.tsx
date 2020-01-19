import React from 'react';

export interface SpeciesData {
    name: string
    ruLocaleName: string
}

export const Species: React.FC<SpeciesData> = (props) => {
    return (
        <tr><td>{props.name}</td><td>{props.ruLocaleName}</td></tr>
    )
}
