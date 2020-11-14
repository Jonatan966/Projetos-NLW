import React from 'react';
import { Link } from 'react-router-dom';

import confirmImg from '../../images/register-sucess.svg';
import { Container } from './styles';

export const UserCreation: React.FC = () => {
    return (
        <Container
            image={confirmImg} 
            backgroundColor="#37C77F"
            btnDefaultColor="#31B272"
            btnHoverColor="#3BD689"
        >
            <div className="content">
                <h1>Iupiii!</h1>
                <p>
                    O cadastro deu certo e agora só falta fazer login!
                </p>
                <Link to="/login">Fazer login</Link>
            </div>
        </Container>
    );
}