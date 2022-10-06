import React, { useEffect, useState } from "react";
import { calculateDistanceHandler, formFieldMeta, HEADER, RESULT } from "./utils";
import AutoComplete from "../../common/AutoComplete";
import "./Homepage.scss";
import Map from "../../common/Map/Map";
import { createFilterOptions } from "@mui/material";
import { getAirport } from "../../api/airport";
import _debounce from "lodash/debounce";

function Homepage() {
	const [formField, setFormField] = useState<any>({});
	const [map, setMap] = useState<any>(null);
	const [marker, setMarker] = useState<any>([]);
	const [options, setOptions] = useState<any>({
		source: [],
		destination: [],
	});

	/* OnKeyDown */
	const onInputChange = async (event: any, key: string) => {
		let data: any = [];
		if (key) data = await getAirport(key);
		setOptions((state: any) => ({
			...state,
			...options,
			[event.target.id]: data,
		}));
	};

	const onInputChangeDebounce = _debounce(onInputChange, 200);

	const setForm = (item: any, value: any) => {
		setFormField({
			...formField,
			[item.key]: value,
		});
	};

	/* Create The Markers */
	useEffect(() => {
		if (formField.source && formField.destination) {
			for (var i = 0; i < marker?.length; i++) {
				marker[i].setMap(null);
			}
			setMarker([]);
			var bounds = new google.maps.LatLngBounds();
			var marker1: any = new google.maps.Marker({
				position: new google.maps.LatLng(formField.source.lat, formField.source.lng),
				map: map,
			});
			bounds.extend(marker1?.position);
			var marker2: any = new google.maps.Marker({
				position: new google.maps.LatLng(formField.destination.lat, formField.destination.lng),
				map: map,
			});
			bounds.extend(marker2.position);
			map.fitBounds(bounds);
			setMarker([marker1, marker2]);
		} 
		if (!formField.source) {
			if (marker[0]) marker[0].setMap(null);
		}
		if (!formField.destination) {
			if (marker[1]) marker[1].setMap(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(formField), map]);

	const filterOptions = createFilterOptions({
		matchFrom: "any",
		stringify: (option: any) => {
			return option.name.toLowerCase() + option.iata.toLowerCase();
		},
	});

	return (
		<div className="homepage">
			<div className="form">
				<div className="form-header">{HEADER}</div>
				<div className="form-field-wrapper">
					{formFieldMeta.map((item) => {
						return (
							<div className="form-field" key={item.key}>
								<AutoComplete
									inputProps={item}
									autoCompleteProps={{
										id: item.key,
										options: options?.[item.key] || [],
										value: formField?.[item.key] || null,
										getOptionLabel: (option: any) => `${option.iata}: ${option.name}`,
										filterOptions: filterOptions,
										onChange: (event: any, value: any) => setForm(item, value),
										onInputChange: onInputChangeDebounce,
									}}
								/>
							</div>
						);
					})}
				</div>
				{formField.source && formField.destination && (
					<div className="form-footer">
						<span>{RESULT}</span> {calculateDistanceHandler(formField.source, formField.destination)}
					</div>
				)}
			</div>
			<Map
				map={map}
				setMap={setMap}
				source={formField?.source ? { lat: parseFloat(formField?.source?.lat), lng: parseFloat(formField?.source?.lng) } : null}
				destination={formField?.destination ? { lat: parseFloat(formField?.destination?.lat), lng: parseFloat(formField?.destination?.lng) } : null}
			/>
		</div>
	);
}

export default Homepage;
