import React from 'react';
import { Link } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import {Container} from './styles';
import logoFull from '../../images/logo-full.svg';
// import './styles.css';

const LoginContainer: React.FC<{backTo?:string, returnable?:boolean}> = ({children, backTo, returnable = true}) => {
    console.log(navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos);
    }));

    return (
        <Container>
            <div className="logo">
                <img src={logoFull} alt="Happy"/>

                <div className="location">
                    <strong>São Paulo</strong>
                    <span>São Paulo</span>
                </div>
            </div>

            <div className="content">
                {
                    returnable &&
                    <Link className="backButton" to={backTo ? backTo : "/"}>
                        <FiArrowLeft size={30} color="#15C3D6"/>
                    </Link>
                }
                
                {children}
            </div>
        </Container>
    );
}

export default LoginContainer;