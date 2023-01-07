<script lang="ts">
	import dayjs from 'dayjs';

	const date = dayjs(Date.now());
	const days = date.daysInMonth();
	const firstDay = date.startOf('D').startOf('M').day();
	const month = date.format('MMMM');
	const today = date.date();

	const daysArray: string[] = [];

	for (let _ of Array(firstDay).fill(null)) {
		daysArray.push('');
	}

	for (let i of Array(days)
		.fill(null)
		.map((_, i) => i + 1)) {
		daysArray.push(i.toString());
	}
</script>

<section>
	<h4 class="text-2xl font-bold">{month}</h4>
	<div class="grid grid-cols-7 place-items-center">
		<span class="font-bold text-emerald-400">S</span>
		<span class="font-bold text-emerald-400">M</span>
		<span class="font-bold text-emerald-400">T</span>
		<span class="font-bold text-emerald-400">W</span>
		<span class="font-bold text-emerald-400">T</span>
		<span class="font-bold text-emerald-400">F</span>
		<span class="font-bold text-emerald-400">S</span>
		{#each daysArray as day}
			<span
				class={+day === today
					? 'w-full rounded bg-emerald-600 text-center'
					: +day < today
					? 'text-zinc-400'
					: ''}>{day}</span
			>
		{/each}
	</div>
</section>
