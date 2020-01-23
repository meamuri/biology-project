import React from 'react';
import {getApiData} from '../api';
import {Link} from 'react-router-dom';
import {Phylum} from './Phylum';
import {PhylumTaxon as PhylumData} from '../taxon';

interface FloraComponentState {
    data: PhylumData[]
}

interface FloraComponentProps {
    name: string
}

export class FloraComponent extends React.Component<FloraComponentProps, FloraComponentState> {
    constructor(props: FloraComponentProps) {
        super(props);
        this.state = {data: []}
    }
    componentDidMount() {
        getApiData().then(e => {
            this.setState({data: e.data})
        })
    }
    render(): React.ReactElement {
        if (!this.state.data.length) {
            return <div/>
        }
        let flora = this.state.data.map(e => <Phylum name={e.name} children={e.children}/> );
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">{this.props.name}</Link>
                    </div>
                </nav>
                <div className="container">
                    {flora}
                </div>
            </div>
        )
    }
}
