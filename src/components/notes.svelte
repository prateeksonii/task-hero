<script lang="ts">
	import feathers from 'feather-icons';

	let isLoading = true;
	let isEditMode = false;
	let note = '';
	let noteInput: HTMLElement;

	if (typeof window !== 'undefined') {
		isLoading = false;
		note = localStorage.getItem('note') || '';
	}

	$: if (noteInput) {
		noteInput.focus();
	}

	$: if (typeof window !== 'undefined') {
		localStorage.setItem('note', note);
	}

	const toggleEdit = () => {
		isEditMode = !isEditMode;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		console.log(event.key);
	};
</script>

<section class="relative flex-1 rounded-2xl bg-zinc-700 p-8">
	{#if !isEditMode}
		{#if isLoading}
			<span>Loading...</span>
		{:else if !note}
			<button class="w-full text-2xl" on:click={toggleEdit}>Click to Edit</button>
		{:else}
			<h4 class="mb-2 text-xl font-bold">Note</h4>
			<p>
				{note}
			</p>
			<button
				on:click={toggleEdit}
				on:keydown={handleKeyDown}
				class="absolute top-3 right-3 text-emerald-400"
				>{@html feathers.icons.edit.toSvg({
					height: 16,
					width: 16
				})}</button
			>
		{/if}
	{:else}
		<textarea
			class="w-full border-none bg-inherit text-lg active:focus:border-none active:focus:outline-none"
			rows={8}
			placeholder="Add note"
			bind:value={note}
			on:blur={toggleEdit}
			bind:this={noteInput}
		/>
	{/if}
</section>
