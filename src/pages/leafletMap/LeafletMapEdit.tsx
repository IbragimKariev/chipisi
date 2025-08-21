import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from 'leaflet';

export const LeafletMapEdit = ({ polygonCoordinates }: { polygonCoordinates: [number, number][] }) => {
  const [maplayers, setMaplayers] = useState<any[]>([]);
  const [editPolygon, setEditPolygon] = useState<boolean>(false);

  useEffect(() => {
    if (polygonCoordinates && polygonCoordinates.length > 0) {
      const formattedPolygon = polygonCoordinates.map(coord => L.latLng(coord[0], coord[1]));
      setMaplayers([{
        id: 0,
        latlngs: formattedPolygon,
      }]);
      setEditPolygon(true);
    }
  }, [polygonCoordinates]);

  const _onEdited = (e: any) => {
    const { layers: { _layers } } = e;
   
    Object.values(_layers).forEach(({ _leaflet_id, editing }: any) => {
      setMaplayers((layers) =>
   
        layers.map((l) =>
          l.id === _leaflet_id ? { ...l, latlngs: editing.latlngs } : l
        )
        
      );
    });
  };
  return ( 
    <div>
      <MapContainer
        center={[42.87, 74.59]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <FeatureGroup>
          <EditControl
            position='topright'
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polygon: editPolygon,
            }}
            onEdited={_onEdited}
          />
          {maplayers.map((layer: any) => (
            <Polygon key={layer.id} positions={layer.latlngs} />
          ))}
        </FeatureGroup>
        <TileLayer
          url="//tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};