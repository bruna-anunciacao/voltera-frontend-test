<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let name = $state('');
	let timeoutId;
	let result = $state({
		count: 0,
		name: '',
		age: 0
	});

	async function fetchName(query) {
		console.log('Buscando por:', query);
		result.count += 1;
		result.name = query;
		result.age = Math.floor(Math.random() * 100);
	}

	function searchName() {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			if (name.trim()) {
				goto(`/?name=${encodeURIComponent(name.trim())}`, { replaceState: true });
				fetchName(name.trim());
			} else {
				goto('/', { replaceState: true });
				result = { count: 0, name: '', age: 0 };
			}
		}, 800);
	}

	onMount(() => {
		const urlName = get(page).url.searchParams.get('name');
		if (urlName) {
			name = urlName;
			fetchName(urlName);
		}
	});
</script>

<header class="header">
	<img src="./idadex-logo.png" alt="IdadeX icon" />
	<h1>IdadeX</h1>
</header>
<div class="container">
	<form class="search-form">
		<h2>Descubra a idade média de um nome:</h2>
		<label>
			<p>Digite um nome:</p>
			<input type="text" id="name-input" bind:value={name} oninput={searchName} />
		</label>
	</form>
	{#if result.count > 0}
		<div class="card-result">
			<h2>Resultado da busca:</h2>
			<p>Nome: {result.name}</p>
			<p>Idade: {result.age}</p>
			<p>Nº de Buscas: {result.count}</p>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Inter', sans-serif;
		background: #a1273d;
		background: radial-gradient(circle, rgba(161, 39, 61, 1) 0%, rgba(235, 59, 90, 1) 50%);
	}

	:global(html) {
		box-sizing: border-box;
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: inherit;
	}

	.header {
		width: 100%;
		padding: 1rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}
	.header img {
		width: 5rem;
		height: 5rem;
		margin-right: 20px;
	}
	.header h1 {
		font-size: 2rem;
		color: white;
		margin: 0;
		font-style: normal;
	}
	.container {
		width: 50%;
		max-width: 900px;
		min-width: 300px;
		min-height: 25rem;
		padding: 2rem 0;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
		align-items: center;

		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

		background: white;
	}
	.search-form {
		width: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.search-form h2 {
		margin-bottom: 1rem;
		color: #333;
	}
	.search-form label {
		width: 100%;

		display: flex;
		flex-direction: column;
	}
	.search-form label input {
		max-width: 100%;
		padding: 0.5rem;
		border: 2px solid #a1273d;
		border-radius: 0.5rem;

		font-size: 1rem;
		color: #333;

		transition: border-color 0.5s ease;
	}

	.card-result {
		width: 80%;
		padding: 1rem;
		margin-top: 2rem;

		background: #f9f9f9;
		border-radius: 0.5rem;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}
</style>
