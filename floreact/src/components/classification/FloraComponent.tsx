import React from 'react';
import { getApiData } from '../../lib/api';
import { Phylum } from './Phylum';
import { PhylumTaxon as PhylumData } from '../../lib/taxon';
import TableOfContent from "../table-of-content/TableOfContent";

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
        let flora = this.state.data.map(e => <Phylum id={e.id} key={e.id} name={e.name} ruLocaleName={e.ruLocaleName} children={e.children}/> );
        return (
            <div className="row">
                <div className="col-3">
                    <TableOfContent data={this.state.data}/>
                </div>
                <div className="col-9" data-spy="scroll" data-target="#flora-table-of-content" data-offset="0">
                    <table className="table mt-3">
                        <thead>
                        <tr>
                            <th scope="col" colSpan={2} style={{width: '70%'}} />
                            <th scope="col" style={{width: '30%'}}>встречаемость</th>
                        </tr>
                        </thead>
                    </table>
                    {flora}
                </div>
            </div>
        )
    }
}
