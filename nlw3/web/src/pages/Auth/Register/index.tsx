import { Form } from '@unform/web';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from '../../../components/Form';
import LoginContainer from '../../../components/LoginContainer';
import api from '../../../Services/api';

const Register: React.FC = () => {
  const page = useHistory();

  async function handleCreateAccount(data: any) {
    const {email, password, confPassword} = data;

    if (password === confPassword) {
      const results = await api.post('/user', {email, password});

      if (results.status === 201) {
        page.replace('/register/sucess');
      }
    }
  }

  return (
    <LoginContainer backTo="/login">
      <h1>Crie uma conta</h1>

      <Form onSubmit={handleCreateAccount}>
        <Input 
          title="E-mail" 
          name="email" 
          type="email"
        />

        <Input 
          title="Senha" 
          name="password" 
          type="password"
        />

        <Input
          title="Repita a senha"
          name="confPassword"
          type="password"
        />

        <button type="submit">
          Criar conta
        </button>
      </Form>

    </LoginContainer>
  );
};

export default Register;
