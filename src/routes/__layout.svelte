<script lang="ts">
	import Footer from '../components/footer.component.svelte';
	import Header from '../components/header.component.svelte';
</script>

<!-- HTML -->
<div class="content">
    <Header />
    <div class="main-content">
        <slot />
    </div>
    <Footer />
</div>


<style>
	.content {
		height: 100%;
	}

    .main-content {
        margin-bottom: 48px;
        padding-bottom: 48px;
    }
</style>
