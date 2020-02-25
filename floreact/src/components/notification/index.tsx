import React from 'react'
import Toast from 'react-bootstrap/Toast'

type NotificationProps = {
    show: boolean,
    msg: string,
    onClose: () => void,
}

export default class Notification extends React.Component<NotificationProps, any> {
    render(): React.ReactElement {
        return (
            <Toast show={this.props.show}>
                <Toast.Header>
                    <strong className="mr-auto">Оповещение</strong>
                    <small>5 sec</small>
                </Toast.Header>
                <Toast.Body>{this.props.msg}</Toast.Body>
            </Toast>
        )
    }
}
