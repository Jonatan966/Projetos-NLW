import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Form} from '@unform/web';

import { useAuth } from '../../../contexts/auth';
import LoginContainer from '../../../components/LoginContainer';
import { Input } from '../../../components/Form';
// import api from '../../../Services/api';

function Login() {
    const { logIn } = useAuth();
    const redirector = useHistory();

    async function handleLogin(data: any) {
        if (await logIn(data)) {
            redirector.push('/dashboard');
            return;
        }
        alert('Usuário e/ou senha inválidos');
    }

    return (
        <LoginContainer>
            <h1>Fazer Login</h1>

            <Form onSubmit={handleLogin}>
                <Input name="email" title="E-mail"/>
                <Input name="password" type="password" title="Senha"/>

                <div className="h-grid">
                    <label htmlFor="cbxRemember">
                        <input 
                            type="checkbox" 
                            id="cbxRemember"
                        />
                        <span>Lembrar-me</span>
                    </label>

                    <Link to="/forget">Esqueci minha senha</Link>
                </div>

                <div className="h-grid">
                    <button type="submit">Entrar</button>

                    <Link to="/register">
                        Criar uma conta
                    </Link>
                </div>

            </Form>
        </LoginContainer>
    );
}

export default Login;