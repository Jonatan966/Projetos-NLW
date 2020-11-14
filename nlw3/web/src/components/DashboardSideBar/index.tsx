import React from 'react';
import {FiPower, FiAlertCircle, FiArrowLeft, FiPlus} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import {HiOutlineLocationMarker as HiMapMarker} from 'react-icons/hi';

import {useAuth} from '../../contexts/auth';

import {Container} from '../SideBar/styles';
import mapMarkerImg from '../../images/map-marker.svg';
import LinkedSoftButton from '../SoftButton/Linked';
import SimpleSoftButton from '../SoftButton/Simple';

const DashboardSideBar: React.FC<{changeMenu(num: number): void, activeMenu: number}> = ({changeMenu, activeMenu}) => {
    const {logOut} = useAuth();
    const redirector = useHistory();

    function handleLogOut() {
        logOut();
        redirector.replace('/');
    }

    return (
        <Container>
            <img src={mapMarkerImg} alt="Happy" />
            
            <div className="btn-group">
                <SimpleSoftButton 
                    className={activeMenu === 0 ? 'selected' : ''}
                    onClick={() => changeMenu(0)}
                >
                    <HiMapMarker color="#fff" size={25}/>
                </SimpleSoftButton>

                <SimpleSoftButton 
                    className={activeMenu === 1 ? 'selected' : ''}
                    onClick={() => changeMenu(1)}
                >
                    <FiAlertCircle color="#fff" size={25}/>
                </SimpleSoftButton>
            </div>

            <footer className="btn-group">
                <LinkedSoftButton title="Adicionar um orfanato" to="/dashboard/add">
                    <FiPlus color="#fff" size={20}/>
                </LinkedSoftButton>

                <LinkedSoftButton title="Voltar" to="/">
                    <FiArrowLeft color="#fff" size={20}/>
                </LinkedSoftButton>

                <SimpleSoftButton 
                    title="Desconectar-se" 
                    onClick={handleLogOut}
                >
                    <FiPower 
                        color={"#fff"} 
                        size={20}
                    />
                </SimpleSoftButton>
            </footer>
        </Container>

    );
}

export default DashboardSideBar;