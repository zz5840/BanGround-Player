<template>
	<q-card>
		<q-card-section horizontal>
			<q-img
				src="https://via.placeholder.com/107"
				style="width: 107px;"
			/>

			<q-card-section style="max-width: calc(100% - 107px)">
				<p class="text-h6 q-my-none ellipsis">Song Name</p>
				<p class="text-subtitle2 q-my-none ellipsis">Artists</p>
				<p class="q-my-none">
					<q-badge color="expert">Expert 26</q-badge>
				</p>
			</q-card-section>
		</q-card-section>

		<q-separator />

		<q-card-section>
			<record-item :data="record" :inset="true" />
		</q-card-section>

		<q-card-actions>
			<q-btn
				flat
				label="View Detail"
				color="primary"
				:to="`/records/details?type=community&id=114514`"
			/>
			<q-btn flat label="Delete" color="negative" @click="deleteSong()" />
		</q-card-actions>
	</q-card>
</template>

<script>
	import RecordItem from 'components/Records/RecordItem';
	export default {
		name: 'SongCard',
		components: { RecordItem },
		data() {
			return {
				record: {
					perfect: 114,
					great: 0,
					good: 0,
					bad: 0,
					miss: 514,
					maxCombo: 10,
					score: 19198,
					type: 0
				}
			};
		},
		methods: {
			deleteSong() {
				this.$q
					.dialog({
						message:
							'This action will delete all the play records of this song, are you sure?',
						cancel: true,
						persistent: true
					})
					.onOk(() => {
						// console.log('>>>> OK')
					});
			}
		}
	};
</script>
