<script>
	import { page } from '$app/stores';
	import { goto, invalidate } from '$app/navigation';

	const { data } = $props();
	let name = $state(data.name || '');
	let timeoutId;
	let darkMode = $state(false);

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

	function toggle() {
        darkMode = !darkMode;
		window.document.body.classList.toggle('dark-mode');
	}


</script>

<header class="header">
	<img src="./idadex-logo.png" alt="IdadeX icon" />
	<h1>IdadeX</h1>
</header>
<section class="hero">
	<div class={darkMode ? 'container container-dark-mode' : 'container'}>
        <h2 class="form-title">A idade média do nome</h2>
		<form class="search-form">
			<label>
				<p>Digite um nome:</p>
				<input type="text" id="name-input" bind:value={name} oninput={searchName} placeholder="Nome"/>
			</label>
		</form>
		{#if data.result.name !== ''}
			<div class={darkMode ? 'card-result card-result-dark-mode' : 'card-result'}>
				<h3>Resultado da busca:</h3>
				<p>Nome: {data.result.name}</p>
				<p>Idade: {data.result.age}</p>
				<p>Nº de Buscas: {data.result.count}</p>
			</div>
		{/if}
	</div>
</section>
<div class="dark-mode-toggle">
	<button class={darkMode ? 'dark-mode-button' : 'light-mode-button'} onclick={toggle}
		><img
			src={darkMode ? './light-mode-icon.svg' : './dark-mode-icon.svg'}
			alt={darkMode ? 'activate light mode button' : 'activate dark mode button'}
		/></button
	>
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
		top: 0;
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
	.hero {
		width: 100%;
		height: 75vh;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		width: 35%;
		max-width: 800px;
		min-width: 300px;
		min-height: 30rem;
		padding: 2rem 0;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
		align-items: center;

		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

		background: white;

        transition: all 0.5s ease-out;
	}

    .container-dark-mode {
        background: #282828;

        color: white;

        transition: all 0.5s ease-out;
    }

    .hero .container-dark-mode .form-title {
        color: white;
    }
	.search-form {
		width: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.form-title {
		margin-bottom: 1rem;

		color: #333;
        font-size: 1.6rem;
        text-transform: uppercase;
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

    .container-dark-mode .search-form label input {
        background: #3f3f3f;

        color: white;
    }

	.card-result {
		width: 80%;
		padding: 1rem;
		margin-top: 2rem;

		background: #dbdbdb;
		border-radius: 0.5rem;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}

    .card-result-dark-mode {
        background: #3f3f3f;
        color: white;
    }

	.dark-mode-toggle {
		width: 100%;
		padding: 2rem;
	}

	.light-mode-button {
		width: 4rem;
		height: 4rem;

		position: fixed;
		right: 2rem;
		bottom: 2rem;

		background-color: #333;

		border-radius: 50%;
		border: none;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.9);

		cursor: pointer;
        transition: all 0.5s ease-out;
	}

	.light-mode-button img {
		width: 2rem;
		height: 2rem;
	}

	.dark-mode-button {
		width: 4rem;
		height: 4rem;

		position: fixed;
		right: 2rem;
		bottom: 2rem;

		background-color: #dbdbdb;

		border-radius: 50%;
		border: none;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.9);

		cursor: pointer;
        transition: all 0.5s ease-out;
	}

	.dark-mode-button img {
		width: 2rem;
		height: 2rem;
	}

    @media (max-width: 900px) {
        .container {
            width: 90%;
        }

        .hero {
            height: auto;
        }
    }

    @media (max-width: 500px) {
        .form-title {
            font-size: 1.2rem;
        }
    }
</style>
