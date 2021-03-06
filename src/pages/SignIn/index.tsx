import React, { useCallback, useRef, useContext } from 'react'

import { Link } from 'react-router-dom'

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import logoGoBarber from '../../assets/logo.svg'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Container, Content, Background, AnimationContainer } from './styles'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { FormHandles } from '@unform/core'
import getValidationErrors from '../../utils/getValidationsErros'

interface SignInFormData {
    email: string;
    password: string;
}
const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { user, signIn } = useAuth()
    const { addToast } = useToast()
    const handleSubmit = useCallback(async (data: SignInFormData) => {
        formRef.current?.setErrors({})
        try {
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email(),
                password: Yup.string().required('Senha obrigatória')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await signIn({
                email: data.email,
                password: data.password
            });

            //addToast();

        } catch (err) {
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
            });
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors)
            }

        }
    }, [signIn, addToast])


    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoGoBarber} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>
                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                        <Button type="submit">Entrar</Button>
                        <a href="forgot">Esqueci minha senha</a>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
}
export default SignIn