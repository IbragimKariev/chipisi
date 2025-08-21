import React, { useState } from 'react';
import L from 'leaflet'; // Import the Leaflet library
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { getCookie } from 'typescript-cookie';
import KyLokal from '../changeLang/drawLocalesKy';
import RuLokal from '../changeLang/drawLocalesRu';

// Define the type for the position
type LatLngTuple = [number, number];

interface IContentPart {
  latitude: number ;
  longitude: number ;
}

export const MapLocation = (props: IContentPart) => {
  (L as any).drawLocal = getCookie('i18next') === 'ky' ? KyLokal : RuLokal;



  return (
    <div style={{ marginBottom: '15px' }}>
      <MapContainer
        center={[props.latitude, props.longitude] as LatLngTuple} 
        zoom={13}
        style={{ height: '300px', width: '400px'}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[props.latitude, props.longitude]}>
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
        </Marker>
      </MapContainer>
    </div>
  );
};