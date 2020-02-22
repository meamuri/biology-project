import React from 'react';
import { getApiData } from '../../lib/api';
import { Phylum } from './Phylum';
import { PhylumTaxon as PhylumData } from '../../lib/taxon';
import Table from 'react-bootstrap/Table'

interface FloraComponentState {
    data: PhylumData[]
}

interface FloraComponentProps {
}

export class FloraComponent extends React.Component<FloraComponentProps, FloraComponentState> {
    constructor(props: FloraComponentProps) {
        super(props);
        this.state = { data: [] }
    }
    componentDidMount() {
        getApiData().then(e => {
            this.setState({ data: e.data })
        })
    }
    render(): React.ReactElement | null {
        if (!this.state.data.length) {
            return null
        }
        let flora = this.state.data.map(e => <Phylum key={e.id} name={e.name} ruLocaleName={e.ruLocaleName} children={e.children}/> );
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
