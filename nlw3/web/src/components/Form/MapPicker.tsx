import { useField } from '@unform/core';
import { LatLngTuple, LeafletMouseEvent } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

import mapIcon from "../../utils/mapIcon";
import { MapPickerContainer } from './styles';

const mapURL = `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

const MapPicker: React.FC<{disabled?: boolean}> = ({disabled = false, children}) => {
    const {
        fieldName: latFieldName, 
        registerField: latRegisterField, 
        defaultValue: latDefaultValue,
        error: latError,
        clearError: latClearError
    } = useField('latitude');
    const {
        fieldName: lngFieldName, 
        registerField: lngRegisterField, 
        defaultValue: lngDefaultValue,
        error: lngError,
        clearError: lngClearError
    } = useField('longitude');

    const [position, setPosition] = useState({latitude: 0, longitude: 0});
    const [centerPos, setCenterPos] = useState([2,2]);
  
    useEffect(() => {
        if (latDefaultValue && lngDefaultValue) {
            setCenterPos([latDefaultValue, lngDefaultValue]);
            setPosition({latitude: latDefaultValue, longitude: lngDefaultValue});
        }
        else {
            navigator.geolocation.getCurrentPosition((pos) => {
                const {latitude, longitude} = pos.coords;
                setCenterPos([latitude, longitude]); 
            });    
        }
    }, [latDefaultValue, lngDefaultValue]);

    useEffect(() => {
        latRegisterField({
            name: latFieldName,
            ref: position,
            path: 'latitude'
        });

        lngRegisterField({
            name: lngFieldName,
            ref: position,
            path: 'longitude'
        });
    }, [position]);
    
    function handleMapClick(event: LeafletMouseEvent) {
        if (!disabled) {
            const {lat, lng} = event.latlng;
            
            latClearError();
            lngClearError();

            setPosition({
              latitude: lat,
              longitude: lng
            });    
        }
    }
    
    return (
        <MapPickerContainer>
            <Map
                center={centerPos as LatLngTuple} 
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onclick={handleMapClick}
                dragging={!disabled}
                touchZoom={!disabled}
                zoomControl={!disabled}
                scrollWheelZoom={!disabled}
                doubleClickZoom={!disabled}
            >
                <TileLayer 
                    url={mapURL}
                />

                {position.latitude !== 0 && (
                    <Marker 
                        interactive={false} 
                        icon={mapIcon} 
                        position={[
                        position.latitude
                        ,position.longitude
                        ]} 
                    />
                ) }

            </Map>
            
            {children &&
            <footer className={(latError && lngError) ? 'error' : ''}>
                {children}
            </footer>
            }
        </MapPickerContainer>
    ); 
}

export default MapPicker;