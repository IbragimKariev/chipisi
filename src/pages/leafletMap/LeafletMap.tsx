import L from 'leaflet'; // Import the Leaflet library
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { useState } from 'react';
import { FeatureGroup, MapContainer, TileLayer } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import { getCookie } from 'typescript-cookie';
import KyLokal from '../../components/changeLang/drawLocalesKy';
import RuLokal from '../../components/changeLang/drawLocalesRu';
import { EntLatLng } from '../../models/latLng';



export class EntLatLngs {
  id: number = 0;
  latlngs: EntLatLng[] | null = null;
}

export const LeafletMap = () => {
  (L as any).drawLocal = getCookie("i18next") === 'ky' ? KyLokal : RuLokal;
  const [maplayers, setMaplayers] = useState<EntLatLngs[]>([]);
  
  const _onCreated = (e: any) => {
    const { layerType, layer } = e;
  
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      const latlngs = layer.getLatLngs()[0]; 
      if (latlngs) {
        setMaplayers((prevLayers) => {
          const updatedLayers = [...prevLayers, { id: _leaflet_id, latlngs }];
  
          const updatedData = updatedLayers.map((item: EntLatLngs) => {
            if (item.id === _leaflet_id && item.latlngs) {
              const firstElement = item.latlngs[0];
              return {
                ...item,
                latlngs: [...item.latlngs, firstElement],
              };
            }
            return item;
          });
  
          return updatedData;
        });
      }
    }
  };
  
  
  const _onEdited = (e: any) => {
    const {
      layers: { _layers },
    } = e;
  
    Object.values(_layers).map(({ _leaflet_id, editing}: any) => {
      setMaplayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id ? { ...l, latlngs: editing.latlngs } : l
        )
      );
    });
  };

  const _onDeleted = (e: any) => {
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map(({ _leaflet_id }: any) => {
      setMaplayers(
        layers => layers.filter(l => l.id !== _leaflet_id)
      );
    });
  };

  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [20, 32],
    iconAnchor: [14, 32], 
  });

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
              polygon:true,
              marker: {
                icon: customIcon,
              }
            }}
            onCreated={_onCreated}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
          />
        </FeatureGroup>
        <TileLayer
          url="//tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      <pre>
        {JSON.stringify(maplayers, null, 2)}
      </pre>
    </div>
  );
};