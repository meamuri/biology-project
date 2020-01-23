import React from 'react';
import {getApiData} from '../api';
import {Link} from 'react-router-dom';
import {Phylum} from './Phylum';
import {Phylum as PhylumData} from '../taxon';

interface FloraComponentState {
    data: PhylumData[]
}

export class FloraComponent extends React.Component<{}, FloraComponentState> {
    // let data = await getApiData();
    // let flora = data.map(e => <Phylum name={e.name} children={e.children}/> )
    constructor() {
        super({});
        this.state = {data: []}
    }
    componentDidMount() {
        getApiData().then(e => {
            this.setState({data: e.data})
        })
    }
    render(): React.ReactElement {
        if (!this.state.data.length) {
            return <div></div>
        }
        let flora = this.state.data.map(e => <Phylum name={e.name} children={e.children}/> );
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Flora</Link>
                    </div>
                </nav>
                <div className="container">
                    {flora}
                </div>
            </div>
        )
    }
}
