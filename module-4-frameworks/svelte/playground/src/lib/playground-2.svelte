<script lang="ts">
	import Childcomponent from './childcomponent.svelte';

	let name = 'Lemon';
	let surname = 'Pie';

	/**
	 * Este console no se re-redenderiza, solo saldrá 1 vez.
	 * Los updates del nombre en el input son quirurgicos., solo hacen update en
	 * el h1, no renderiza el componente entero, son "micro-renders"
	 */
	console.log('Hello', name);
	console.log('Hello', surname);

	/**
	 * En cambio, si se hace con un $: se re-renderiza el componente entero.
	 * Como ves, no hace falta poner dependencias, Svelte se encarga de eso.
	 * $: significa que lo que sigue es reactivo a los cambios de las variables.
	 */
	// $: console.log('Hello', name); -> Una exprexión

	// Un bloque:
	// $: {
	// 	console.log('Hello', name);
	// 	console.log('Hello', surname);
	// }
</script>

<h1>Hello {name}{surname}!</h1>
<Childcomponent {name}></Childcomponent>
<div>
	<p>Input</p>
	<input type="text" bind:value={name} />
	<input type="text" bind:value={surname} />
</div>

<style>
	h1 {
		color: purple;
	}
</style>
