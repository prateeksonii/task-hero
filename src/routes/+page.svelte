<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Weather from '../components/weather.svelte';
	import Calendar from '../components/calendar.svelte';
	import Clock from '../components/clock.svelte';
	import Notes from '../components/notes.svelte';
	import Bookmarks from '../components/bookmarks.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: console.log(form);
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
	<div />
	<div class="relative flex h-screen flex-col bg-zinc-800 p-8">
		<Bookmarks {form} />
	</div>
</main>
