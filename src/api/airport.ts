export const getAirport = async (key: string) => {
	try {    
		const url = `http://api.geonames.org/search?q=${key}&username=beastridervv&type=json&fcodeName=airport&fcode=AIRP&countryCode=US`;
		let data: any = await fetch(url);
		data = await data.json();
		return data?.geonames || [];
	} catch (err) {
    return [];
	}
};
