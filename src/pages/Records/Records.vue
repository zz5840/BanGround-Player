<template>
	<q-page class="q-pt-md q-pb-lg">
		<song-card />
	</q-page>
</template>

<script>
	import SongCard from 'components/Records/SongCard';
	export default {
		name: 'PageRecords',
		components: { SongCard }
	};
</script>
