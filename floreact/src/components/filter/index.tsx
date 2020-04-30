import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { signsToFrequency } from '../../lib/frequency'


export default class Filter extends React.Component<any, any> {
    render(): React.ReactElement {
        let frequenciesSigns = signsToFrequency()
        let signs = Object.keys(frequenciesSigns)
        return (
            <Accordion className="mt-3" defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Природоохранный статус
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form>
                                {['ALL', ...signs].map(e =>
                                    <Form.Check
                                        type='checkbox'
                                        id={e}
                                        label={`${e}`}
                                    />
                                )}
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Местоположение
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}
