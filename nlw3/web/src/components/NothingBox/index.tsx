import React from 'react';

import {Container} from './styles';
import errorIcon from '../../images/error-icon.svg';

export default function NothingBox() {
    return (
        <Container>
            <img src={errorIcon} alt="Sad"/>
            <span>Nenhum no momento</span>
        </Container>
    );
}