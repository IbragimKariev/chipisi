import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon,
  Marker,
  useMap,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { getCookie } from 'typescript-cookie';
import KyLokal from '../changeLang/drawLocalesKy';
import RuLokal from '../changeLang/drawLocalesRu';
import _ from 'lodash';

const MapDisplayFix = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

interface MapPolygonProps {
  value?: any[][];
  onChange?: (val: any[][]) => void;
  markerValue?: { lat: number; lng: number } | null;
  onMarkerChange?: (val: { lat: number; lng: number } | null) => void;
  withPolygon?: boolean;
  withMarker?: boolean;
  userPolygon?:any;
}

export const Map = ({
  value = [],
  onChange,
  markerValue = null,
  onMarkerChange,
  userPolygon,
  withPolygon = true,
  withMarker = false,
}: MapPolygonProps) => {
  const [polygons, setPolygons] = useState<any[][]>(value);
  const [userPolygons, setUserPolygons] = useState<any[]>(userPolygon && JSON.parse(userPolygon));
  const [marker, setMarker] = useState(markerValue);

  (L as any).drawLocal = getCookie('i18next') === 'ky' ? KyLokal : RuLokal;

  const polygonsRef = useRef<any[][]>(value);
  const markerRef = useRef(markerValue);

  useEffect(() => {
    // setUserPolygons(JSON.parse(userPolygon))
    if (!_.isEqual(value, polygonsRef.current)) {
      polygonsRef.current = value || [];
      setPolygons(polygonsRef.current);
    }
  }, [value]);

  useEffect(() => {
    if (!_.isEqual(markerValue, markerRef.current)) {
      markerRef.current = markerValue;
      setMarker(markerValue);
    }
  }, [markerValue]);

  const ensureClosedPolygon = (coords: any[]) => {
    if (coords.length < 3) return coords;
    const first = coords[0];
    const last = coords[coords.length - 1];
    if (!_.isEqual(first, last)) {
      return [...coords, first];
    }
    return coords;
  };
  // console.log(userPolygons)
  const updatePolygons = (next: any[][]) => {
    polygonsRef.current = next;
    setPolygons(next);
    onChange?.(next);
  };

  const updateMarker = (next: { lat: number; lng: number } | null) => {
    markerRef.current = next;
    setMarker(next);
    onMarkerChange?.(next);
  };

  const handleCreated = (e: any) => {
    if (e.layer instanceof L.Polygon && withPolygon) {
      const latlngs = e.layer.getLatLngs()[0];
      const closed = ensureClosedPolygon(latlngs.map((p: any) => ({ lat: p.lat, lng: p.lng })));
      const updated = [...polygons, closed];
      updatePolygons(updated);
    } else if (e.layer instanceof L.Marker && withMarker) {
      const { lat, lng } = e.layer.getLatLng();
      updateMarker({ lat, lng });
    }
  };

  const handleEdited = (e: any) => {
    const newPolygons: any[][] = [];

    Object.values(e.layers._layers).forEach((layer: any) => {
      if (layer instanceof L.Polygon && withPolygon) {
        const latlngs = layer.getLatLngs()[0];
        const closed = ensureClosedPolygon((latlngs as LatLng[]).map((p: any) => ({ lat: p.lat, lng: p.lng })));
        newPolygons.push(closed);
      } else if (layer instanceof L.Marker && withMarker) {
        const { lat, lng } = layer.getLatLng();
        updateMarker({ lat, lng });
      }
    });

    if (withPolygon) updatePolygons(newPolygons);
  };

  const handleDeleted = (e: any) => {
    const toRemovePolygons = Object.values(e.layers._layers)
      .filter((layer: any) => layer instanceof L.Polygon)
      .map((layer: any) =>
        ensureClosedPolygon(layer.getLatLngs()[0].map((p: any) => ({ lat: p.lat, lng: p.lng })))
      );

    const updated = polygons.filter(
      poly => !toRemovePolygons.some(r => _.isEqual(poly, r))
    );

    if (withPolygon) updatePolygons(updated);

    Object.values(e.layers._layers).forEach((layer: any) => {
      if (layer instanceof L.Marker && withMarker) {
        updateMarker(null);
      }
    });
  };

  return (
    <div style={{ marginBottom: '15px' }}>
     <MapContainer center={[42.87, 74.59]} zoom={11} style={{ height: '400px', width: '100%' }}>
  <MapDisplayFix />
  

  <FeatureGroup>
    <EditControl
      position="topright"
      draw={{
        polygon: withPolygon,
        marker: withMarker,
        rectangle: false,
        polyline: false,
        circle: false,
        circlemarker: false,
      }}
      onCreated={handleCreated}
      onEdited={handleEdited}
      onDeleted={handleDeleted}
    />


    {withPolygon && polygons.map((item, i) => (
      <Polygon key={`poly_${i}`} positions={item} />
    ))}


    {withMarker && marker && <Marker position={marker} />}
  </FeatureGroup>


  <FeatureGroup>
    {userPolygons && userPolygons.map((item, i) => (
      <Polygon
        key={`user_poly${i}`}
        pathOptions={{
          color: '#008080',
          fillColor: '#008080',
          fillOpacity: 0.2,
          weight: 1,
        }}
        positions={item}
        interactive={false} // чтобы полигоны не реагировали на клики (по желанию)
      />
    ))}
  </FeatureGroup>

  <TileLayer
    url="//tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
    attribution="&copy; OpenStreetMap contributors"
  />
</MapContainer>

    </div>
  );
};
