<script>
	import Clock from "../components/clock.svelte";
	import Notes from "../components/notes.svelte";
</script>

<main class="p-8 grid grid-cols-[1fr_2fr_1fr] gap-4 h-screen">
  <div class="flex flex-col gap-4">
    <Clock />
    <Notes />
  </div>

</main>