// +page.js
/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
	const name = url.searchParams.get('name');
	if (!name) {
		return {
			result: {
				count: 0,
				name: '',
				age: 0
			},
			name: ''
		};
	}

	const res = await fetch(`https://api.agify.io/?name=${encodeURIComponent(name)}`);
	const result = await res.json();
	
	return {
		result,
		name
	};
}
