<script lang="ts">
	import { getUsers } from './api';
	import type { User } from './model';

	let name = $state('');
</script>

<input bind:value={name} placeholder="Enter user name" />
<h1>Search by "{name}"</h1>

{#snippet listItem(user: User)}
	<li>{user.name} - {user.email}</li>
{/snippet}

{#await getUsers(name)}
	<p>Loading...</p>
{:then users}
	<ul>
		<!-- Condición EACH -->
		{#each users as user (user.id)}
			<!-- Reutilizando bucle con SNIPPET + @ -->
			{@render listItem(user)}
		{/each}
	</ul>

	<!-- Condición IF -->
	{#if users.length === 0}
		<p>No users found</p>
	{/if}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	h1 {
		color: indianred;
	}
</style>
