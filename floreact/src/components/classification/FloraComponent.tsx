import React from 'react';
import { Phylum } from './Phylum';
import { PhylumTaxon as PhylumData } from '../../lib/taxon';
import Table from 'react-bootstrap/Table'

type FloraComponentState = { }

type FloraComponentProps = { data: PhylumData[] }

export class FloraComponent extends React.Component<FloraComponentProps, FloraComponentState> {
    render(): React.ReactElement | null {
        if (!this.props.data.length) {
            return null
        }

        let flora = this.props.data.map(e => <Phylum
            key={e.id}
            name={e.name}
            ruLocaleName={e.ruLocaleName}
            children={e.children}/>
        );
        return (
            <>
                <Table className="mt-3">
                    <thead>
                    <tr>
                        <th scope="col" colSpan={2} style={{width: '70%'}} />
                        <th scope="col" style={{width: '30%'}}>встречаемость</th>
                    </tr>
                    </thead>
                </Table>
                {flora}
            </>
        )
    }
}
