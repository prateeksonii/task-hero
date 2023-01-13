<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Weather from '../components/weather.svelte';
	import Calendar from '../components/calendar.svelte';
	import Clock from '../components/clock.svelte';
	import Notes from '../components/notes.svelte';
	import Bookmarks from '../components/bookmarks.svelte';
	import type { IBookmark } from 'src/types/IBookmark';

	export let data: PageData;
	export let form: ActionData;

	let bookmarks: IBookmark[];

	$: console.log(form);

	$: console.log(bookmarks);

	$: if (typeof window !== 'undefined') {
		console.log('RUN');

		const bookmarksJson = localStorage.getItem('taskhero_bookmarks') as any;
		if (!bookmarksJson) {
			bookmarks = [];
		} else {
			bookmarks = JSON.parse(bookmarksJson) as IBookmark[];
		}
	}

	$: if (form) {
		const bookmark = {
			title: form.title,
			color: form.color
		};
		if (typeof window !== 'undefined') {
			let bookmarksJson = localStorage.getItem('taskhero_bookmarks') as any;
			if (!bookmarksJson) {
				bookmarks = [bookmark];
			} else {
				bookmarks = JSON.parse(bookmarksJson) as IBookmark[];
				bookmarks = [...bookmarks, bookmark];
			}

			localStorage.setItem('taskhero_bookmarks', JSON.stringify(bookmarks));
		}
	}
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
	<div class="relative flex h-screen flex-col bg-zinc-800 p-2">
		<Bookmarks {bookmarks} />
	</div>
</main>
