import React from 'react';
import { Container } from './styles';

import waitImg from '../../images/waiting.svg';

const LoadingScreen: React.FC = () => {
    return (
        <Container
            backgroundColor="#14BFCC"
            image={waitImg}
        >
            <div className="content">
                <h1>Carregando . . .</h1>
            </div>
        </Container>
    );
}

export default LoadingScreen;