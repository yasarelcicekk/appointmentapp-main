import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import './map.css';
import "leaflet/dist/leaflet.css";

const markerIcon = new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]});

const Map = ({ latitude = 41.04836857387819, longitude = 28.8968787 }) => {
  const mapRef = useRef(null); 

  return(
    <MapContainer className="map-responsive" center={[latitude, longitude]} zoom={17} ref={mapRef}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker icon={markerIcon} position={[latitude, longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map;