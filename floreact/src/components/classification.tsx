import React from 'react';
import { Link } from "react-router-dom";
import { FloraComponent } from "./classification/FloraComponent";

export default class Classification extends React.Component<any, any> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Flora</Link>
                    </div>
                </nav>
                <div className="container">
                    <FloraComponent/>
                </div>
            </>
        )
    }
}
