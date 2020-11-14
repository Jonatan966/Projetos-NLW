import React from 'react';
import { Link } from 'react-router-dom';

import confirmImg from '../../images/orphanage-sucess.svg';
import {Container} from './styles';

function OrphanageCreation() {
    return (
        <Container 
            image={confirmImg} 
            backgroundColor="#37C77F"
            btnDefaultColor="#31B272"
            btnHoverColor="#3BD689"
        >
            <div className="content">
                <h1>Ebaaa!</h1>
                <p>
                    O cadastro deu certo e foi enviado
                    ao administrador para ser aprovado.
                    Agora é só esperar :)
                </p>
                <Link to="/dashboard">Voltar para o Painel</Link>
            </div>
        </Container>
    );
}

export default OrphanageCreation;