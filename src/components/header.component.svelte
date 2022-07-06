<script lang="ts">
    import IconButton from '@smui/icon-button';
    import TopAppBar,{ Row,Section,Title,  } from '@smui/top-app-bar';
    
	let dense = true;
</script>

<!-- HTML -->

<div class="header">
	<TopAppBar {dense} variant="fixed">
		<Row>
			<Section>
				<Title>paraWind</Title>
			</Section>
			<!-- <Section>
				<IconButton class="material-icons">my_location</IconButton>
			</Section>
			<Section><div class="mdc-typography--headline1">Biberg</div></Section> -->
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
</style>