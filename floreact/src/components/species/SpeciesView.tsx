import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { SpeciesRecord } from '../../lib/taxon'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { describeFrequency, } from '../../lib/frequency'
import { toLocaleName, } from '../../lib/schema/complexes'
import { toLocaleName as hydrophileToLocaleName, } from '../../lib/schema/hydrophilie'
import { formToName } from '../../lib/schema/biomorph'
import './SpeciesView.css'
import { coenoticToLocaleName } from '../../lib/schema/coenotic'

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
                    {computeRow('Класс', data.classTaxon ? data.classTaxon.name : 'Нет описания класса' )}
                    {data.biomorph && computeRow('Жизненная форма', formToName(data.biomorph))}
                    {data.frequency && computeRow('Природоохранный статус', describeFrequency(data.frequency))}
                    {data.complex && computeRow('Эколого-флористический комплекс', toLocaleName(data.complex))}
                    {data.hydrophile && computeRow('По отношению к влаге', hydrophileToLocaleName(data.hydrophile))}
                    {data.coenotic && computeRow('Ценотическая группа', coenoticToLocaleName(data.coenotic))}
                    {data.areal && computeRow('Занимаемый ареал', data.areal)}
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
