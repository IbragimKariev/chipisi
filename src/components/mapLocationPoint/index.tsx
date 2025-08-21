import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';
import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { getCookie } from 'typescript-cookie';
import KyLokal from '../changeLang/drawLocalesKy';
import RuLokal from '../changeLang/drawLocalesRu';
import { EntLatLng } from '../../models/latLng';



const MapDisplayFix = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

interface MapLocationPointProps {
  markerValue?: EntLatLng | null;
  
  onMarkerChange?: (val: EntLatLng | null) => void;
  setLatLngs?: Dispatch<SetStateAction<EntLatLng | undefined>>;
}

export const MapLocationPoint = ({
  markerValue = null,
  onMarkerChange,
  setLatLngs
}: MapLocationPointProps) => {
  const featureGroupRef = useRef<L.FeatureGroup>(null);
  const [editControlKey, setEditControlKey] = useState(0);

  (L as any).drawLocal = getCookie('i18next') === 'ky' ? KyLokal : RuLokal;

  useEffect(() => {
    if (!featureGroupRef.current) return;

    featureGroupRef.current.eachLayer(layer => {
      featureGroupRef.current?.removeLayer(layer);
    });

    if (markerValue) {
      const marker = new L.Marker([markerValue.lat, markerValue.lng]);
      featureGroupRef.current.addLayer(marker);
      if (setLatLngs) setLatLngs(markerValue);
    }

    setEditControlKey(prev => prev + 1);
  }, [markerValue, setLatLngs]);

  const handleCreated = (e: any) => {
    if (e.layer instanceof L.Marker) {
      featureGroupRef.current?.eachLayer(layer => {
        featureGroupRef.current?.removeLayer(layer);
      });

      featureGroupRef.current?.addLayer(e.layer);

      const latLng = e.layer.getLatLng();
      const coordinates = new EntLatLng(latLng.lat, latLng.lng);
      if (setLatLngs) setLatLngs(coordinates);
      onMarkerChange?.(coordinates);
    }
  };

  const handleEdited = (e: any) => {
    const layers = e.layers.getLayers();
    if (layers.length === 1 && layers[0] instanceof L.Marker) {
      const latLng = layers[0].getLatLng();
      const coordinates = new EntLatLng(latLng.lat, latLng.lng);
      if (setLatLngs) setLatLngs(coordinates);
      onMarkerChange?.(coordinates);
    }
  };

  const handleDeleted = (e: any) => {
    const layers = e.layers.getLayers();
    if (layers.some((layer: any) => layer instanceof L.Marker)) {
      if (setLatLngs) setLatLngs(undefined);
      onMarkerChange?.(null);
    }
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <MapContainer 
        center={[42.87, 74.59]} 
        zoom={11} 
        style={{ height: '400px', width: '100%' }}
      >
        <MapDisplayFix />
        <TileLayer
          url="//tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
          attribution="&copy; OpenStreetMap contributors"
        />
        
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            key={editControlKey}
            position="topright"
            draw={{
              polygon: false,
              marker: {
                icon: new L.Icon.Default(),
                repeatMode: false
              },
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
            }}
            edit={{
              edit: true,
              remove: true
            }}
            onCreated={handleCreated}
            onEdited={handleEdited}
            onDeleted={handleDeleted}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};