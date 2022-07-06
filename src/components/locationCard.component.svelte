<!-- TS -->
<script lang="ts">
	import Card from '@smui/card';
	import List, { Item, Separator } from '@smui/list';
	import type { ILocationData } from 'src/models/locationData.model';

	export let locationData: ILocationData;
</script>

<!-- HTML -->
<div class="card-container">
	<Card padded class="pw-card">
		<div pw-card-header class="card-header">
			<h5 class="no-margin">{locationData.name}</h5>
			<p class="subtitle">{locationData.height} m</p>
		</div>
		<Separator />
		<div class="card-body">
			<List>
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
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 16px;


		.subtitle {
			margin: 4px 0px 8px 0px!important;
		}
	}

	.card-body {
		display: flex;
		flex-direction: column;
	}

	.data-title {
		font-weight: bold;
		flex: 60;
	}

	.data-value {
		flex: 40;
	}
</style>
