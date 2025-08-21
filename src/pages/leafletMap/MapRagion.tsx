import L, { LatLngBounds, LatLngBoundsLiteral, LatLngTuple } from "leaflet"; // Import the Leaflet library
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { FeatureGroup, MapContainer, Polygon, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { getCookie } from "typescript-cookie";
import KyLokal from "../../components/changeLang/drawLocalesKy";
import RuLokal from "../../components/changeLang/drawLocalesRu";
import MapDisplayFix from "./MapDisplayFix";

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
  polygon: EntLatLngs[];
}
export const MapRagion = (props: IContentPart) => {
  (L as any).drawLocal = getCookie("i18next") === "ky" ? KyLokal : RuLokal;
  const [countPolygon, setCountPolygon] = useState<number>(
    props.polygon.length
  );

  const [maplayers, setMaplayers] = useState<any>(props.polygon);
  const polygon: EntLatLng[] | null = maplayers[0]?.latlngs;
  const mapContainerRef = useRef<any>(null);

  useEffect(() => {
    const map = mapContainerRef.current;
    let bounds: LatLngBounds | null = null;

    if (!props.polygon || !map) return;
    if (props.polygon.length > 0) {
      const polygons = JSON.parse(JSON.stringify(props.polygon));
      polygons.forEach((polygon: any, i: any) => {

        const coord = polygon.map((coord: any) => [coord.lat, coord.lng]);
        if (i === 0) {
          bounds = new LatLngBounds(coord as LatLngBoundsLiteral);
        } else {
          bounds!.extend(coord);
        }
      });
    }
    if (bounds && bounds !== null) {
      if ((bounds as LatLngBounds).isValid()) {
        map.fitBounds(bounds);
      }
    }
    
  }, [props.polygon]);

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
      coordinates.push({
        lat: Number(lat.toFixed(6)),
        lng: Number(lng.toFixed(6)),
      });
    });
    if (props.setLatLngs) {
      if (countPolygon > 1) {
        props.setLatLngs(maplayers);
      } else {
        props.setLatLngs(maplayers);
      }
    }
  }, [polygon, maplayers]);

  const _onDeleted = (e: any) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ editing }: any) => {
      if (props.setLatLngs) {
        const coordinates = editing.latlngs[0];
        if (coordinates) {
          let coor = coordinates.map((i: any) =>
            i.map((item: any) => ({ lat: item.lat, lng: item.lng }))
          );
          let ind = props.polygon.findIndex(
            (item: any) =>
              Number(item[0].lat) === coor[0][0].lat &&
              Number(item[0].lng) === coor[0][0].lng
          );
          let updLay = props.polygon;
          updLay.splice(ind, 1);
          setMaplayers(updLay);
          props.setLatLngs(updLay);
        }
      }
    });

    setCountPolygon((prevValue) => prevValue - 1);
  };

  const _onEdited = (e: any) => {
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map(({ _leaflet_id, editing }: any) => {
      if (props.setLatLngs) {
        const coordinates = editing.latlngs[0];
        if (coordinates) {
          let coor = coordinates.map((i: any) =>
            i.map((item: any) => ({ lat: item.lat, lng: item.lng }))
          );
          let ind = props.polygon.findIndex(
            (item: any) =>
              Number(item[0].lat) === coor[0][0].lat &&
              Number(item[0].lng) === coor[0][0].lng
          );
          let updLay = props.polygon;
          updLay[ind] = coor[0];
          setMaplayers(updLay);
          props.setLatLngs(updLay);
        }
      }
    });
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <MapContainer
        center={[42.87, 74.59]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        ref={mapContainerRef}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              polygon: true,
              marker: false,
            }}
            onCreated={_onCreated}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
          />

          {maplayers.length === 0 ? (
            props.polygon.length > 0 &&
            (props.polygon[0] as any).length === undefined ? (
              <Polygon key={Math.random()} positions={props.polygon as any} />
            ) : (
              props.polygon.map((item: any) => {
                return <Polygon key={Math.random()} positions={item as any} />;
              })
            )
          ) : (
            maplayers.map((item: any) => {
              return <Polygon key={Math.random()} positions={item as any} />;
            })
          )}
          <MapDisplayFix />
        </FeatureGroup>

        <TileLayer
          url="//tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};
