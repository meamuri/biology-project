import React, {FormEvent} from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { signsToFrequency } from '../../lib/frequency'


export default class Filter extends React.Component<any, any> {
    private readonly prefix: string = 'frequency-filter'

    constructor(props: any) {
        super(props)
        this.handleFormInput = this.handleFormInput.bind(this)
    }

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
                                        key={`${this.prefix}-key-${e}`}
                                        type='checkbox'
                                        id={`${this.prefix}-id-${e}`}
                                        label={`${e}`}
                                        onChange={this.handleFormInput}
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

    handleFormInput(event: FormEvent<HTMLInputElement>) {
        console.log("Wooosh")
    }
}
