import React, { ChangeEvent } from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { signsToFrequency } from '../../lib/frequency'
import { SpeciesRecord } from '../../lib/taxon'

type FilterProps = {
    handleFiltersChanged: (filters: ((f: SpeciesRecord) => boolean)[]) => void,
}

type FilterState = {
    allSelected: boolean,
    selected: Set<string>,
}

export default class Filter extends React.Component<FilterProps, FilterState> {
    private readonly prefix: string = 'frequency-filter'

    constructor(props: any) {
        super(props)
        this.state = {
            allSelected: true,
            selected: new Set<string>(),
        }
        this.handleAllCheckbox = this.handleAllCheckbox.bind(this)
    }

    render(): React.ReactElement {
        let allCheckbox = (
            <Form.Check
                key={`${this.prefix}-key-ALL`}
                type='checkbox'
                id={`${this.prefix}-id-ALL`}
                label='ВСЕ'
                checked={this.state.allSelected}
                onChange={this.handleAllCheckbox}
            />
        );
        let frequenciesSigns = signsToFrequency()
        let signs = Object.keys(frequenciesSigns)
        let checkboxes = signs.map(e =>
            <Form.Check
                key={`${this.prefix}-key-${e}`}
                type='checkbox'
                id={`${this.prefix}-id-${e}`}
                label={`${e}`}
                checked={this.state.selected.has(e)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => this.handleFrequencyCheckbox(event, e)}
            />
        )
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
                                {[allCheckbox, ...checkboxes]}
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

    handleAllCheckbox(event: ChangeEvent<HTMLInputElement>) {
        let isChecked = event.target.checked
        this.setState((state, props) => ({
            selected: isChecked ? new Set<string>() : state.selected,
            allSelected: isChecked,
        }))
    }

    handleFrequencyCheckbox(event: ChangeEvent<HTMLInputElement>, n: string) {
        let isChecked = event.target.checked
        this.setState((state, props) => {
            if (isChecked) {
                state.selected.add(n)
            } else {
                state.selected.delete(n)
            }
            return {
                allSelected: state.selected.size === 0,
                selected: state.selected,
            }
        })
    }
}
