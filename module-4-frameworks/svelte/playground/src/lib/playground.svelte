<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';

	let name = 'world';

	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		name = event.currentTarget.value;
	};
</script>

<h1>Hello {name}!</h1>
<div>
	<p>Básico</p>
	<input type="text" value={name} oninput={(event) => (name = event.currentTarget.value)} />
</div>
<div>
	<p>Esto de abajo es lo mismo que arriba</p>
	<input type="text" value={name} oninput={handleInput} />
</div>
<div>
	<p>
		bind lo que hace es "enlazar", se llama "two-way binding", enlaza el value/name con el
		oninput/handleinput
	</p>
	<input type="text" bind:value={name} />
</div>

<style>
	h1 {
		color: purple;
	}
</style>
