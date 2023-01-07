<script>
	import Calendar from '../components/calendar.svelte';
	import Clock from '../components/clock.svelte';
	import Notes from '../components/notes.svelte';
</script>

<main class="grid h-screen grid-cols-[1fr_2fr_1fr] gap-4 p-8">
	<div class="flex flex-col gap-4">
		<Clock />
		<Notes />
		<Calendar />
	</div>
</main>
