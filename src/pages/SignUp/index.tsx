import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'

import logoGoBarber from '../../assets/logo.svg'


import { Container, Content, Background } from './styles'

import * as Yup from 'yup'

import Button from '../../components/Button'
import Input from '../../components/Input'

import getValidationErrors from '../../utils/getValidationsErros'

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(async (data: object) => {
        formRef.current?.setErrors({})
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email(),
                password: Yup.string().min(6, 'No mínimo 6 dígitos')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors)
        }
    }, [])
    return (
        <Container>
            <Background />
            <Content>
                <img src={logoGoBarber} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <Link to="/">
                    <FiArrowLeft />
                Voltar para o logon
            </Link>
            </Content>
        </Container>
    )
}

export default SignUp