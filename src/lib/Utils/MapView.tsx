import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

interface prop {
  lat: number;
  lng: number;
}
function MapView({ lat, lng }: prop) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: lat, lng: lng }}
        zoom={10}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker
          position={{
            lat: lat,
            lng: lng,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;
