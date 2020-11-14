import React from 'react';
import LoginContainer from '../../../components/LoginContainer';

export default function ForgetPassword() {
    return (
        <LoginContainer backTo="/login">
            <h1>Esqueci a senha</h1>

            <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>

            <label htmlFor="">
                <span>E-mail</span>
                <input 
                    type="email"
                />
            </label>

            <button>Enviar</button>
        </LoginContainer>
    );
}