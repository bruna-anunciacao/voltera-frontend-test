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
        age: 0,
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
<header>
    <img src='./favicon.png' alt="a"/>
    <h1>SvelteKit Test App</h1>
</header>
<div>
    <form>
        <label>
            <p>Digite um nome:</p>
            <input type="text" bind:value={name} oninput={searchName} placeholder="Nome" />
        </label>
    </form>
</div>
{#if result.count > 0}
    <div>
        <h2>Resultado da busca:</h2>
        <p>Nome: {result.name}</p>
        <p>Idade: {result.age}</p>
        <p>Contagem de buscas: {result.count}</p>
    </div>
{/if}