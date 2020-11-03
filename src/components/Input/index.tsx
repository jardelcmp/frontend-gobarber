import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import Toltip from '../../components/Toltip'
import { Container, Error } from './styles'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    icon?: React.ComponentType<IconBaseProps>

}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const { fieldName, defaultValue, error, registerField } = useField(rest.name)

    const handleInputFocused = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)

        setIsFilled(!!inputRef.current?.value)


    }, [])
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])
    return (
        <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={20} />}
            <input onFocus={handleInputFocused} onBlur={handleInputBlur} ref={inputRef} defaultValue={defaultValue} {...rest} />
            {error && 
                <Error title={error}>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>}
        </Container>
    )
}

export default Input