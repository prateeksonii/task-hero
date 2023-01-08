<script lang="ts">
	import dayjs from 'dayjs';

	let time = Date.now();
	setInterval(() => {
		time = Date.now();
	}, 1000);

	$: formattedTime = dayjs(time).format('hh:mm A');
</script>

<section class="grid place-items-center rounded-2xl bg-black p-4 text-2xl">
	{formattedTime}
</section>
