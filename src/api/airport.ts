export const getAirport = async (key: string) => {
	try {    
		const url = `${process.env.REACT_APP_API_URL}/get?key=${key}`;
		let data: any = await fetch(url);
		data = await data.json();
		return data?.data || [];
	} catch (err) {
    return [];
	}
};
