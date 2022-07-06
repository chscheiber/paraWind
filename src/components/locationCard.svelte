<!-- TS -->
<script lang="ts">
	import Card from '@smui/card';
	import List, { Item, Separator } from '@smui/list';
	import type { ILocationData } from 'src/models/locationData.model';

	export let locationData: ILocationData;
</script>

<!-- HTML -->
<div class="card-container">
	<Card padded>
		<div class="card-header">
			<h2 class="no-margin">{locationData.name}</h2>
		</div>
		<Separator />
		<div class="card-body">
			<List>
				<Item>
					<div class="data-title">Height:</div>
					<div class="data-value">
						{locationData.height} m
					</div>
				</Item>
				<Separator />
				<Item>
					<div class="data-title">Wind Speed:</div>
					<div class="data-value">
						{locationData.windSpeed} km/h
					</div>
				</Item>
				<Separator />
				<Item>
					<div class="data-title">Wind Gusts:</div>
					<div class="data-value">
						{locationData.windGusts} km/h
					</div>
				</Item>
				<Separator />
				<Item>
					<div class="data-title">Wind Direction:</div>
					<div class="data-value">
						{locationData.windDirection}
					</div>
				</Item>
			</List>
		</div>
	</Card>
</div>

<!-- CSS -->
<style lang="scss">
	.no-margin {
		margin: 0px !important;
	}
	.card-container {
		min-width: 300px;
		div:first-child {
			border-radius: 12px !important;
		}
	}

	.card-header {
		display: flex;
		justify-content: center;

		margin: 16px 0px;
	}

	.card-body {
		display: flex;
		flex-direction: column;
	}

	.data-title {
		font-weight: bold;
		flex: 70;
	}

	.data-value {
		flex: 30;
	}
</style>
