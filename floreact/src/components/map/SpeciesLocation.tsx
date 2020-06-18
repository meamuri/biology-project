import React from 'react'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLng } from 'leaflet'
import Modal from "react-bootstrap/Modal"
import './SpeciesLocation.css'

type SpeciesLocationProps = {
    showMap: boolean,
    positionLatitude: number,
    positionLongitude: number,
    zoom: number
}

export default class SpeciesLocation extends React.Component<SpeciesLocationProps, any> {
    render() {
        let position: LatLng = new LatLng(this.props.positionLatitude, this.props.positionLongitude)
        return <>
            <Modal.Header closeButton>
                <Modal.Title>Распространение вида</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LeafletMap center={position} zoom={this.props.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </LeafletMap>
            </Modal.Body>
        </>
    }

}
