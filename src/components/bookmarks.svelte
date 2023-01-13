<script lang="ts">
	import { z } from 'zod';
	import { enhance } from '$app/forms';
	import feathers from 'feather-icons';
	import type { IBookmark } from 'src/types/IBookmark';

	const bookmarkValidator = z.object({
		url: z.string().url()
	});

	let isModalOpen = false;
	let url = '';
	let bookmarkInput: HTMLInputElement;
	let bookmarkForm: HTMLFormElement;
	let errorMessage = '';

	export let bookmarks: IBookmark[];

	$: console.log(bookmarks);

	$: if (!bookmarks) {
		bookmarks = [];
	}

	const toggleModal = () => {
		isModalOpen = !isModalOpen;
	};

	$: if (isModalOpen && bookmarkInput) {
		bookmarkInput.focus();
	}

	const escEventListener = (event: KeyboardEvent) => {
		if (isModalOpen) {
			if (event.key === 'Escape') {
				isModalOpen = false;
			}
		}
	};

	// $: console.log(form?.color, form?.title);

	if (typeof window !== 'undefined') {
		document.addEventListener('keydown', escEventListener);
	}

	const handleDelete = (index: number) => {
		bookmarks = bookmarks.filter((_, i) => i !== index);
		localStorage.setItem('taskhero_bookmarks', JSON.stringify(bookmarks));
	};
</script>

<div class="absolute -left-7 bottom-7">
	<div class="relative">
		{#if !isModalOpen}
			<button
				on:click={toggleModal}
				class=" flex items-center gap-2 rounded-full bg-black py-4 px-4 font-bold transition-all hover:bg-emerald-800 hover:text-white"
			>
				<span>
					{@html feathers.icons.plus.toSvg({
						height: 24,
						width: 24
					})}</span
				>
			</button>
		{:else}
			<div class="absolute -right-14 bottom-0 z-10 mx-auto w-[800px]">
				<form
					method="post"
					action="?/bookmark"
					class="flex items-end gap-4"
					use:enhance={async ({ data, cancel }) => {
						const url = data.get('url');
						const parsedObject = await bookmarkValidator.safeParseAsync({
							url
						});

						if (!parsedObject.success) {
							cancel();
							errorMessage = parsedObject.error.errors.pop()?.message || '';
						} else {
							errorMessage = '';
							toggleModal();
						}
					}}
					bind:this={bookmarkForm}
				>
					<div class="flex w-full flex-col justify-end pb-2">
						{#if errorMessage}
							<div class="float-right w-max rounded-t bg-red-200 py-1 px-2 text-sm text-red-900">
								{errorMessage}
							</div>
						{/if}
						<input
							class="w-full rounded bg-zinc-800"
							type="text"
							name="url"
							id="url"
							bind:this={bookmarkInput}
							bind:value={url}
							placeholder="Paste any url here to bookmark"
						/>
					</div>
					<button
						type="submit"
						class="flex items-center gap-2 rounded-full bg-black py-4 px-4 font-bold transition-all hover:bg-emerald-800 hover:text-white"
					>
						<span class="animate-[spin_0.1s_linear]">
							{@html feathers.icons.check.toSvg({
								height: 24,
								width: 24
							})}
						</span>
					</button>
				</form>
			</div>
		{/if}
	</div>
</div>
{#if bookmarks.length === 0}
	<div class="grid flex-1 place-items-center">No bookmarks</div>
{:else}
	<ul class="flex flex-col gap-3">
		{#each bookmarks as bookmark, i}
			<li
				class="flex items-center justify-between rounded-lg p-5 text-lg brightness-75"
				style="background-color: {bookmark.color}"
			>
				<span class="brightness-100">{bookmark.title}</span><button
					class="rounded-full p-2 hover:bg-red-500"
					on:click={() => handleDelete(i)}
					>{@html feathers.icons.trash.toSvg({
						height: 20,
						width: 20
					})}</button
				>
			</li>
		{/each}
	</ul>
{/if}
