import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../../../utils/mapIcon';
import api from '../../../Services/api';
import LinkedSoftButton from '../../../components/SoftButton/Linked';
import { Orphanage } from '../../../utils/globalInterfaces';

import mapMarkerImg from '../../../images/map-marker.svg';
import {OrphanagesMapContainer} from './styles';

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [location, setLocation] = useState({latitude: -23.6815315, longitude: -46.8754812});
 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const {latitude, longitude} = pos.coords;
            setLocation({latitude, longitude});
        }, () => {
            alert('Ocorreu um problema ao tentar identificar sua localização');
        });

        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return (
        <OrphanagesMapContainer>
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h1>Escolha um orfanato no mapa</h1>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <LinkedSoftButton to="/">
                        <FiArrowLeft size={20} color="#fff"/>
                    </LinkedSoftButton>
                    
                    <label>
                        <strong>São Paulo</strong>
                        <span>São Paulo</span>
                    </label>
                </footer>
            </aside>

            <Map 
                center={[location.latitude, location.longitude]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                {orphanages.map(orphanage => {
                    return (
                        <Marker 
                        position={[orphanage.latitude, orphanage.longitude]}
                        icon={mapIcon}
                        key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#fff"/>
                                </Link>
                            </Popup>
                        </Marker>    
                    );
                })}
            </Map>
        </OrphanagesMapContainer>
    )
}

export default OrphanagesMap;