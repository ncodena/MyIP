import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';

const Map = ({data}) => {
  return (
    <div className="mapContainer">
      { Object.keys(data).length > 0 ? (
        <MapContainer center={[data.lat, data.lng]}  zoom={13} scrollWheelZoom={false} style={{ height: '500px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[data.lat, data.lng]}>
            <img src={`https://www.countryflags.io/${data.country}/flat/64.png`} alt="Flag" />
          </Marker>
        </MapContainer>
      ) : null}
    </div>
  );
};

export default Map;