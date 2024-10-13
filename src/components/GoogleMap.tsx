'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindowF, useJsApiLoader } from '@react-google-maps/api';
import loadPositions from '@/shikagikoujo.json';

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const containerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 34.8073861,
  lng: 137.7933586
};

const divStyle = {};

type Position = {
  name: string;
  lat: number;
  lng: number;
  address: string;
  tel: string;
};

const MyComponent: React.FC = () => {
  const [size, setSize] = useState<google.maps.Size | undefined>(undefined);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const [, setMap] = useState<google.maps.Map | null>(null);
  const [positions] = useState<Position[]>(loadPositions);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setSize(new window.google.maps.Size(0, -45));
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {positions.map((position, index) => (
        <Marker
          key={index}
          position={{ lat: position.lat, lng: position.lng }}
          onClick={() => setSelectedPosition(position)}
          title='test title'
        />
      ))}
      
      {selectedPosition && (
        <InfoWindowF
          position={{ lat: selectedPosition.lat, lng: selectedPosition.lng }}
          onCloseClick={() => setSelectedPosition(null)}
          options={{ pixelOffset: size, headerContent: selectedPosition.name }}
        >
          <div style={divStyle}>
            <div>{selectedPosition.address}</div>
            <div>{selectedPosition.tel}</div>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  ) : null;
};

export default MyComponent;