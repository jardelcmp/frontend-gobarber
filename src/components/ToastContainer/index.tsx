import React from 'react';
import { useTransition } from 'react-spring'

import { ToastMessage, useToast } from '../../hooks/toast'
import { Container } from './styles'
import Toast from './Toast';
interface ToastContainerProps {
    messages: ToastMessage[]
}
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const messagesWithTransictions = useTransition(
        messages,
        message => message.id,
        {
            from: { right: '-120%' },
            enter: { right: '0%' },
            leave: { right: '-120%' }
        }
    )
    return (
        <Container>
            {messagesWithTransictions.map(({ item, key, props }) => (
                <Toast key={key} style={props} message={item}>

                </Toast>
            ))}

        </Container>
    )
}

export default ToastContainer;