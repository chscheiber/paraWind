<!-- TS -->
<script lang="ts">
	import IconButton from '@smui/icon-button';
	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import type { ILocationData } from 'src/models/locationData.model';
	import { onMount } from 'svelte';
	import LocationCard from '../components/locationCard.svelte';

	let topAppBar: TopAppBarComponentDev;
	let bottomAppBar: TopAppBarComponentDev;
	let dense = true;
	let locationDataItems: ILocationData[] = [];

	const getWindDirection = (dir: number) => {
		const factor = (dir / 365) * 32;
		const mapping = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']
		return mapping[Math.round(factor / 4)]
	}

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
			windDirection: `${getWindDirection(locationData.values.WR)} (${Math.round(locationData.values.WR)}°)`,
			windGusts: Math.round(locationData.values.WG_BOE)
		};
		return response;
	};

	onMount(async () => {
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
		if (data) locationDataItems = data;
	});
</script>

<!-- HTML -->
<div class="header">
	<TopAppBar bind:this={topAppBar} {dense} variant="fixed">
		<Row>
			<Section>
				<Title>paraWind</Title>
			</Section>
			<Section>
				<IconButton class="material-icons">my_location</IconButton>
			</Section>
			<Section><div class="mdc-typography--headline1">Biberg</div></Section>
		</Row>
	</TopAppBar>
</div>

<div class="content">
	<div class="location-cards">
		{#each locationDataItems as locationData}
			<div class="location-card">
				<LocationCard {locationData} />
			</div>
		{/each}
	</div>
</div>

<div class="bottom-app-bar-container">
	<TopAppBar bind:this={bottomAppBar} variant="fixed">
		<Row>
			<Section>
				<Title>&nbsp;</Title>
			</Section>
		</Row>
	</TopAppBar>
</div>

<!-- CSS -->
<style>
	.header {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		z-index: 1000;
	}
	.bottom-app-bar-container {
		position: fixed;
		bottom: 48px;
		left: 0px;
	}

	.content {
		height: 100%;
		width: 100%;
		margin-top: 48px;
		display: flex;
		flex: 1;
	}

	.location-cards {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: 8px;
	}

	.location-card {
		margin: 8px;
		flex: 1;
	}
</style>
