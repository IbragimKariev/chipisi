import { useMap } from "react-leaflet";

const MapDisplayFix = () => {
	const map = useMap();
	map.invalidateSize();
	return null;
};

export default MapDisplayFix;
