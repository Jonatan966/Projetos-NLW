import React from 'react';
import LoginContainer from '../../../components/LoginContainer';

export default function ResetPassword() {
    return (
        <LoginContainer returnable={false}>
            <h1>Redefinição de senha</h1>
            
            <p>
                Escolha uma nova senha para você
                acessar o dashboard do Happy
            </p>

            <label htmlFor="">
                <span>Nova senha</span>
                <input type="password" name="" id=""/>
            </label>

            <label htmlFor="">
                <span>Repetir senha</span>
                <input type="password" name="" id=""/>
            </label>

            <button>Enviar</button>
        </LoginContainer>
    );
}