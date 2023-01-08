<script lang="ts">
	import type { PageData } from './$types';
	import Weather from '../components/weather.svelte';
	import Calendar from '../components/calendar.svelte';
	import Clock from '../components/clock.svelte';
	import Notes from '../components/notes.svelte';

	export let data: PageData;

	$: console.log(data);
</script>

<main class="grid h-screen grid-cols-[1fr_2fr_1fr] gap-4">
	<div class="flex h-screen flex-col justify-between gap-4 p-8">
		<div class="grid grid-cols-2 gap-4">
			<Weather temp={data.json.hourly.temperature_2m.pop()} />
			<Clock />
		</div>
		<Notes />
		<Calendar />
	</div>
</main>
