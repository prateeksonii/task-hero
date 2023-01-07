<script lang="ts">
  import dayjs from 'dayjs';

  let time = Date.now();
  setInterval(() => {
    time = Date.now()
  }, 1000)

  $: formattedTime = dayjs(time).format('hh:mm:ss A')
</script>

<section class="text-2xl rounded-2xl bg-zinc-700 p-8 text-center">
  {formattedTime}
</section>
