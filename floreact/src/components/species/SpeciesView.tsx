import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { SpeciesRecord } from '../../lib/taxon'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { describeFrequency, } from '../../lib/frequency'
import { formToName } from '../../lib/schema/biomorph'

type ViewProps = {
    data: SpeciesRecord,
    show: boolean,
    handleCloseModal: () => void
}

export const SpeciesView: React.FC<ViewProps> = (props: ViewProps) => {
    let { data } = props
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
                    {data.biomorph && computeRow('Биологическая форма', formToName(data.biomorph))}
                    {data.frequency && computeRow('Природоохранный статус', describeFrequency(data.frequency))}
                    {computeRow('Описание', data.description)}
                </Container>
            </Modal.Body>
        </Modal>
    )
}

function computeRow(label: string, val: any) {
    return <Row>
        <Col sm={4}>
            {label}:
        </Col>
        <Col sm={8}>
            {val}
        </Col>
    </Row>
}