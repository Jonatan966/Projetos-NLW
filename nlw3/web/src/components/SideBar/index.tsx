import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../../images/map-marker.svg';
import SimpleSoftButton from '../SoftButton/Simple';

import {Container} from './styles';

export default function SideBar() {
    const { goBack } = useHistory();

    return (
        <Container>
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
                <SimpleSoftButton type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </SimpleSoftButton>
            </footer>
        </Container>
 
    );
}