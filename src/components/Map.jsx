import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const Map = ({data}) => {
  return (
    <div className="mapContainer">
      { Object.keys(data).length > 0 ? (
        <MapContainer center={[data.lat, data.lng]}  zoom={13} scrollWheelZoom={false} style={{ height: '500px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[data.lat, data.lng]} />
        </MapContainer>
      ) : null}
    </div>
  );
};

export default Map;