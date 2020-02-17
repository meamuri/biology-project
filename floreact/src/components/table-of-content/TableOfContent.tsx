import React from "react";
import {PhylumTaxon as PhylumData} from "../../lib/taxon";

interface ContentProps {
    data: PhylumData[]
}

const TableOfContent: React.FC<ContentProps> = (props) => {
    let menu = props.data.map(e => <div>
        <a className="nav-link" href={e.id}>{e.name}</a>
        {e.children.map(sub => <a className="nav-link ml-3 my-1" href={`#${sub.id}`}>{sub.name}</a>)}
    </div>)
    return (
        <nav id="flora-table-of-content" className="navbar navbar-light bg-light mt-3">
            {menu}
        </nav>
    )
};

export default TableOfContent;
