import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { SpeciesRecord } from '../../lib/taxon'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import { describeFrequency, } from '../../lib/frequency'
import { toLocaleName, } from '../../lib/schema/complexes'
import { formToName } from '../../lib/schema/biomorph'
import './SpeciesView.css'

type ViewProps = {
    data: SpeciesRecord,
    show: boolean,
    handleCloseModal: () => void
}

export const SpeciesView: React.FC<ViewProps> = (props: ViewProps) => {
    let { data } = props
    let initialPos = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }
    return (
        <Modal show={props.show} size="lg"
            onHide={props.handleCloseModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>{data.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    {computeRow('Название', data.ruLocaleName)}
                    {computeRow('Класс', data.classTaxon ? data.classTaxon.name : 'Нет описания класса' )}
                    {data.biomorph && computeRow('Жизненная форма', formToName(data.biomorph))}
                    {data.frequency && computeRow('Природоохранный статус', describeFrequency(data.frequency))}
                    {data.complex && computeRow('Эколого-флористический комплекс', toLocaleName(data.complex))}
                    <LeafletMap center={[51.505, -0.09]} zoom={initialPos.zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </LeafletMap>
                    {computeRow('Описание', data.description, 'description')}
                </Container>
            </Modal.Body>
        </Modal>
    )
}

function computeRow(label: string, val: any, className?: string) {
    return <Row>
        <Col sm={4}>
            {label}:
        </Col>
        <Col sm={8} className={className}>
            {val}
        </Col>
    </Row>
}
