<script lang="ts">
	/**
	 * $state es una función que permite crear un estado reactivo.
	 * Se puede usar para crear estados que cambian en el tiempo.
	 */
	let name = $state('Lemoncode');
	let list = $state<string[]>([]);

	const onclick = () => {
		//Ambos sirven pra lo mismo
		// list = [...list, name];
		list.push(name);
	};

	/**
	 * $derived es una función que permite crear derivaciones de un estado.
	 * Se puede usar para crear estados que dependen de otros estados.
	 */
	let count = $state(0);
	let double = $derived(count * 2);
	// Derivaciones más complejas (tipo función)
	let fibonacci = $derived.by(() => {
		const fib = (n: number): number => (n <= 1 ? n : fib(n - 1) + fib(n - 2));
		return fib(count);
	});

	/**
	 * $effect es una función que permite ejecutar efectos secundarios.
	 * Se puede usar para ejecutar código cuando un estado cambia.
	 *
	 * Esto está actua
	 */
	import { onMount } from 'svelte';

	let count2 = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			count2 += 1;
		}, 1000);

		// return the cleanup function
		return () => {
			clearInterval(interval);
		};
	});

	$effect(() => {
		console.log('Effect count2:', count2);
	});

	/**
	 * $inspect es una función que permite inspeccionar un estado.
	 * Se puede usar para depurar el estado de la aplicación.
	 */
	$inspect(name); // -> devuelve "init Lemoncode"

	/**
	 * $props es una función que permite acceder a las propiedades de un componente.
	 * Se puede usar para acceder a las propiedades de un componente.
	 *
	 *
	 */
	import Greetings from './greetcomponent.svelte';

	/**
	 * Callback props son las propiedades que se pasan a un componente.
	 * Se puede usar para acceder a las propiedades de un componente.
	 *
	 * $bindeable es una función que permite crear propiedades bindeables.
	 * Se puede usar para crear propiedades que se pueden bindear
	 */
	import TextField from './text-field.svelte';

	let nameeee = $state('Lemoncoders!');
	const onchangetext = (value: string) => {
		nameeee = value;
	};
</script>

<h1>RUNAS de {name}</h1>
<p>{list.join(', ')}</p>
<div>
	Runa $state

	<input type="text" bind:value={name} />
	<button {onclick}>Add item to list</button>
</div>

<div>
	Runa derived
	<button onclick={() => count++}>
		contador: {count}
	</button>
	<p>contador doble: {double}</p>
	<p>Fibonacci: {fibonacci}</p>
</div>

<div>
	Runa effect
	<p>Count effect: {count2} seconds</p>
</div>

<div>
	Runa inspect
	<p>Inspect: {count2} seconds</p>
</div>

<div>
	Runa props
	<Greetings nameeee="Lemoncode_props()" />
</div>

<div>
	Runa callback props

	<TextField bind:value={nameeee} />
	<Greetings {nameeee} />
</div>

<style>
	h1 {
		color: purple;
	}
</style>
