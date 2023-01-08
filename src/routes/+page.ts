import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(
		'https://api.open-meteo.com/v1/forecast?latitude=28.65&longitude=77.23&hourly=temperature_2m'
	);

	const json = await res.json();

	return {
		json
	};
};
