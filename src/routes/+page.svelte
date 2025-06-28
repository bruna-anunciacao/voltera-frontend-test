<script>
	import { page } from '$app/stores';
	import { goto, invalidate } from '$app/navigation';

	const { data } = $props();
	let name = $state(data.name || '');
	let timeoutId;

	function searchName() {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(async () => {
			if (name.trim()) {
				await goto(`/?name=${encodeURIComponent(name.trim())}`, { replaceState: true });
				await invalidate();
			} else {
				await goto('/', { replaceState: true });
				await invalidate();
			}
		}, 800);
	}
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
	{#if data.result.name !== ''}
		<div class="card-result">
			<h2>Resultado da busca:</h2>
			<p>Nome: {data.result.name}</p>
			<p>Idade: {data.result.age}</p>
			<p>Nº de Buscas: {data.result.count}</p>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Inter', sans-serif;
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

        cursor: pointer;
	}
	.search-form label input {
		max-width: 100%;
		padding: 0.5rem;
		border: 2px solid #a1273d;
		border-radius: 0.5rem;

		font-size: 1.5rem;
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
