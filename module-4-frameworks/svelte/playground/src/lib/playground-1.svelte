<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let logo: HTMLImageElement;

	onMount(() => {
		let i = 0;

		const interval = setInterval(() => {
			// console.log(i);
			i++;
			logo.style.transform = `rotate(${i}deg)`;
		}, 50);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<!-- Enlazando la imagen a la variable "logo" -->
<img
	src="https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/image-annotate-r.png"
	bind:this={logo}
	alt="logo"
	width="200px"
/>

<style>
</style>
