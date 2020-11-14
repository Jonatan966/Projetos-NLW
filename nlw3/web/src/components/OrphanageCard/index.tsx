import React from 'react';
import { Map, Marker, TileLayer } from "react-leaflet";
import {FiArrowRight, FiEdit3, FiEye, FiTrash} from 'react-icons/fi';

import {Container} from './styles';
import mapIcon from "../../utils/mapIcon";
import { Orphanage } from '../../utils/globalInterfaces';
import { Link } from 'react-router-dom';

const OrphanageCard: React.FC<{mode?: 'pending' | 'editable' | 'view', orphanage: Orphanage}> = ({mode = 'editable', orphanage}) => {
    return (
        <Container>
            <Map 
                center={[orphanage.latitude,orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
            >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]} />
            </Map>


            <label>
                <h2>{orphanage.name}</h2>

                {
                    mode === 'pending' &&
                    <Link to={`/dashboard/orphanages/${orphanage.id}/approve`}>
                        <FiArrowRight color="#15C3D6" size={20}/>
                    </Link>
                }

                {
                    mode === 'editable' &&
                    <>
                        <Link to={`/orphanages/${orphanage.id}`}>
                            <FiEye color="#15C3D6" size={20}/>
                        </Link>
                        <Link to={`/dashboard/orphanages/${orphanage.id}/edit`}>
                            <FiEdit3 color="#15C3D6" size={20}/>
                        </Link>
                        
                        <Link to={`/dashboard/orphanages/${orphanage.id}/remove`}>
                            <FiTrash color="#15C3D6" size={20}/>
                        </Link>                    
                    </>
                }
            </label>
        </Container>
    );
}

export default OrphanageCard;