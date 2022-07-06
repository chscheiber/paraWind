<!-- TS -->
<script lang="ts">
	import type { ILocationData } from 'src/models/locationData.model';
	import { onMount } from 'svelte';
	import LocationCard from '../components/locationCard.component.svelte';
	import {weatherStations} from '../data/weatherStations.ts'
</script>

<!-- HTML -->


<div class="content">
	<div class="location-cards">
		{#each $weatherStations as locationData }
			<div class="location-card">
				<LocationCard {locationData} />
			</div>
		{/each}
	</div>
</div>



<!-- CSS -->
<style>
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
