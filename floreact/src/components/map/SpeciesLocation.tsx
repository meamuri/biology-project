import React from 'react'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLng } from 'leaflet'
import Modal from 'react-bootstrap/Modal'
import './SpeciesLocation.css'

type SpeciesLocationProps = {
    positionLatitude: number,
    positionLongitude: number,
    zoom: number,
    handleCloseModal: () => void,
}

export default class SpeciesLocation extends React.Component<SpeciesLocationProps, any> {
    render() {
        let position: LatLng = new LatLng(this.props.positionLatitude, this.props.positionLongitude)
        return <Modal
            show={true}
            onHide={this.props.handleCloseModal}
            size="xl"
        >
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
        </Modal>
    }

}
