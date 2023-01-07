<script lang="ts">
	import dayjs from 'dayjs';

	let time = Date.now();
	setInterval(() => {
		time = Date.now();
	}, 1000);

	$: formattedTime = dayjs(time).format('hh:mm:ss A');
</script>

<section class="rounded-2xl bg-black p-8 text-center text-2xl">
	{formattedTime}
</section>
