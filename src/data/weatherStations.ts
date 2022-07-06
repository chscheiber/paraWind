import type { ILocationData } from '../models/locationData.model';
import { writable } from 'svelte/store';

const dummy: ILocationData = {
    name: 'loading...',
    height: 0,
    windDirection: 'n/a (0°)',
    windGusts: 0,
    windSpeed: 0
}

export const weatherStations = writable<ILocationData[]>([dummy]);

const fetchData = async () => {
	const data = await fetch('https://us-central1-para-wind.cloudfunctions.net/getStationData')
		.then((data) => data.json())
		.then((res) => {
			let sectors = {
				'R01 Nordalpen': [8],
				'R02 Inneralpine Grasberge': [5, 7]
			};
			const result: ILocationData[] = [];
			for (let [sector, indizes] of Object.entries(sectors)) {
				indizes.forEach((index) => result.push(mapToLocationData(res, index, sector)));
			}
			return result;
		})
		.catch((err) => console.debug(err));
	if (data) weatherStations.set(data);
};

fetchData();

const getWindDirection = (dir: number) => {
	const factor = (dir / 365) * 32;
	const mapping = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
	return mapping[Math.round(factor / 4)];
};

const mapToLocationData = (
	data: any,
	index: number,
	sector: string = 'R02 Inneralpine Grasberge'
) => {
	const locationData = data[sector][index].measuredData;
	let response: ILocationData = {
		name: locationData.windStationName,
		height: locationData.windStationAltitude,
		windSpeed: Math.round(locationData.values.WG),
		windDirection: `${getWindDirection(locationData.values.WR)} (${Math.round(
			locationData.values.WR
		)}°)`,
		windGusts: Math.round(locationData.values.WG_BOE)
	};
	return response;
};
