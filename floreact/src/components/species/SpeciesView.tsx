import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { SpeciesRecord } from '../../lib/taxon'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
                    <Row>
                        <Col sm={4}>
                            Биологическая форма:
                        </Col>
                        <Col sm={8}>
                            {data.biomorph}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            Природоохранный статус:
                        </Col>
                        <Col sm={8}>
                            {data.frequency}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            Описание:
                        </Col>
                        <Col sm={8}>
                            {data.description}
                        </Col>
                    </Row>
                </Container>
                <p></p>
            </Modal.Body>
        </Modal>
    )
}
