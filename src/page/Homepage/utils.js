export const DESTINATION = "Destination";
export const SOURCE = "Source";
export const RESULT = "Nautical Miles:";
export const HEADER = "Please enter source and destination";

export const formFieldMeta = [
	{
		placeHolder: SOURCE,
		label: SOURCE,
		key: "source",
	},
	{
		placeHolder: DESTINATION,
		label: DESTINATION,
		key: "destination",
	},
];

export const debounceFun = (func) => {
	let timer;
	return function (...kargs) {
		const context = this;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			func.apply(context, kargs);
		}, 500);
	};
};

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1); // deg2rad below
	const dLon = deg2rad(lon2 - lon1);
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d * 0.539957; //convert to nautical miles
};

export const deg2rad = (deg) => {
	return deg * (Math.PI / 180);
};

export const calculateDistanceHandler = (airportOneData, airportTwoData) => {
	if (airportOneData && airportTwoData) {
		const distance = getDistanceFromLatLonInKm(airportOneData.lat, airportOneData.lng, airportTwoData.lat, airportTwoData.lng);
		return Math.round(distance);
	}
	return "";
};
