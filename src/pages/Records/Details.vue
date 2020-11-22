<template>
	<q-page class="q-pt-md q-pb-lg">
		<p v-if="empty" class="q-mt-lg">
			You haven't played this song, no record can be shown here.
		</p>
	</q-page>
</template>

<script>
	export default {
		name: 'PageRecordsDetails',
		data() {
			return {
				type: null,
				id: null,
				empty: false
			};
		},
		beforeMount() {
			const { query } = this.$route;
			if (!query.type || !query.id) {
				this.empty = true;
			} else {
				this.type = query.type;
				this.id = query.id;
			}
		}
	};
</script>
