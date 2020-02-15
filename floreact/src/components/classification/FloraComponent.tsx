import React from 'react';
import { getApiData } from '../../lib/api';
import { Phylum } from './Phylum';
import { PhylumTaxon as PhylumData } from '../../lib/taxon';

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
    render(): React.ReactElement {
        if (!this.state.data.length) {
            return <div/>
        }
        let flora = this.state.data.map(e => <Phylum key={e.id} name={e.name} ruLocaleName={e.ruLocaleName} children={e.children}/> );
        return (
            <div className="container">
                {flora}
            </div>
        )
    }
}
