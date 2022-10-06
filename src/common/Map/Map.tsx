import React from "react";
import { GoogleMap, useJsApiLoader, Polyline } from "@react-google-maps/api";
import "./Map.scss";

const containerStyle = {
	width: "100%",
	height: "100%",
};

const center = {
	lat: 48.8584,
	lng: -73.2945,
};

interface MapProps {
	source: any;
	destination: any;
	map: any;
	setMap: React.Dispatch<React.SetStateAction<any>>;
}

function Map({ source, destination, setMap, map }: MapProps) {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY || "",
		libraries: ["places"],
	});

	const onUnmount = React.useCallback(function callback(map: any) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<div className="map">
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={15}
				onLoad={(map) => setMap(map)}
				options={{
					zoomControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					fullscreenControl: false,
				}}
				onUnmount={onUnmount}>
				{source && destination && (
					<Polyline
						path={[source, destination]}
						options={{
							geodesic: true,
							strokeColor: "blue",
							strokeOpacity: 1,
							strokeWeight: 2,
						}}
					/>
				)}
			</GoogleMap>
		</div>
	) : (
		<></>
	);
}

export default React.memo(Map);
