import L, { latLng } from 'leaflet'; // Import the Leaflet library
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import { FeatureGroup, MapContainer, Polygon, TileLayer } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import { getCookie } from 'typescript-cookie';
import KyLokal from '../changeLang/drawLocalesKy';
import RuLokal from '../changeLang/drawLocalesRu';
import _ from 'lodash';

export class EntLatLng {
  lat: number = 0;
  lng: number = 0;
}
export class EntLatLngs {
  id: number = 0;
  latlngs: EntLatLng[] | null = null;
}
interface IContentPart {
  setLatLngs?: ((t: any) => void | undefined) | undefined;
  districtPol?: string | undefined;
  polygon: EntLatLngs[];
}

export const MapPolygon = (props: IContentPart) => {
  const [countPolygon, setCountPolygon] = useState<number>(props.polygon.length);
  (L as any).drawLocal = getCookie("i18next") === 'ky' ? KyLokal : RuLokal;
  const [maplayers, setMaplayers] = useState<any>(props.polygon);
  const [tempMaplayers, setTempMaplayers] = useState<any>(props.polygon);
  const polygon: EntLatLng[] | null = maplayers[0]?.latlngs;
  const [districtPol, setDistrictPol] = useState<string | undefined>();

  useEffect(() => {
    setDistrictPol(props.districtPol);
  }, [props.districtPol])

  useEffect(() => {
    if (districtPol && districtPol.trim() !== "clear") {
      setTempMaplayers(maplayers);
      const polygonData = JSON.parse(districtPol).map((point: any) => {
        return point.map((p: any) => ({lat: Number(p.lat), lng: Number(p.lng)}));
      });
      setMaplayers(polygonData);
    }
    if(districtPol === 'clear'){
      setDistrictPol(undefined);
      setMaplayers(tempMaplayers);
    }
  }, [districtPol]);

  const _onCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      const latlngs = layer.getLatLngs()[0];
      if (latlngs) {
        setMaplayers((prevVal: any) => {
          return [...prevVal, latlngs];
        });
        setCountPolygon((prevValue) => {
          return prevValue + 1;
        });
      }
    }
  };


  useEffect(() => {
    let coordinates: any[] = [];
    polygon?.forEach(({ lat, lng }) => {
      coordinates.push({ lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) })
    })
    if (props.setLatLngs) {

      if (countPolygon > 1) {
        props.setLatLngs(maplayers);
      } else {
        props.setLatLngs(maplayers);
      }

    }
  }, [polygon, maplayers])

  const _onEdited = (e: any) => {
    const { layers: { _layers } } = e;
    Object.values(_layers).forEach(({ _leaflet_id, editing }: any) => {
      if (props.setLatLngs && Array.isArray(props.polygon)) {
        const coordinates = editing.latlngs[0];
        if (coordinates) {
          const coor = coordinates.map((i: any) => i.map((item: any) => ({ lat: item.lat, lng: item.lng })));
          const index = props.polygon.findIndex((item: any) => 
            Number(item[0].lat) === coor[0][0].lat && Number(item[0].lng) === coor[0][0].lng
          );
  
          if (index !== -1) {
            const updatedPolygon = [...props.polygon];
            updatedPolygon[index] = coor[0];
  
            setMaplayers(updatedPolygon);
            props.setLatLngs(updatedPolygon); 
          }
        }
      }
    });
  };

  const _onDeleted = (e: any) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ editing }: any) => {
      if (props.setLatLngs) {
        const coordinates = editing.latlngs[0];
        if (coordinates) {
          let coor = coordinates.map((i: any) => i.map((item: any) => ({ lat: item.lat, lng: item.lng })));
          let ind = props.polygon.findIndex((item: any) => Number(item[0].lat) === coor[0][0].lat && Number(item[0].lng) === coor[0][0].lng);
          let updLay = props.polygon;
          updLay.splice(ind, 1);
          setMaplayers(updLay);
          props.setLatLngs(updLay);
        }
      }
    });

    setCountPolygon((prevValue) => prevValue - 1);
  };


  return (
    <div style={{ marginBottom: "15px" }}>
      <MapContainer
        center={[42.87, 74.59]}
        zoom={13}
        style={{ height: '400px', width: "100%" }}
      >
        <FeatureGroup>
          <EditControl
            position='topright'

            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              polygon: true,
              marker: false
            }}
            onCreated={_onCreated}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
          />



          {maplayers.length === 0 ?
            props.polygon.length > 0 && (props.polygon[0] as any).length === undefined ?
              <Polygon key={Math.random()} positions={props.polygon as any} /> :
              props.polygon.map((item: any) => {
                return <Polygon key={Math.random()} positions={item as any} />
              }) :
            maplayers.map((item: any) => {
              return <Polygon key={Math.random()} positions={item as any} />
            })
          }

          {/* <Polygon key={Math.random()} positions={polygons.length !== 0 ? polygons : maplayers.length === 0 ? oldPolygon : polygon as any} />
          <Polygon key={Math.random()} positions={polygons.length !== 0 ? polygons : maplayers.length === 0 ? oldPolygon : polygon as any} /> */}
        </FeatureGroup>



        <TileLayer
          url="//tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};
