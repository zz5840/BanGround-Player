<template>
	<q-page class="q-pt-md q-pb-lg">
		<q-card class="q-mb-md">
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
		</q-card>
		<p class="text-center" v-if="records.length === 0">
			{{ $t('game.nullRecords') }}
		</p>
		<div class="q-mb-md text-center" v-else>
			<div class="q-mb-md">
				<q-btn
					:label="$t('game.back')"
					color="primary"
					to="/"
					class="q-mr-md"
				/>
				<q-btn
					:label="$t('game.viewAll')"
					color="primary"
					to="records"
				/>
			</div>
			<record-item
				v-for="(v, i) in records"
				:key="i"
				:data="v"
			></record-item>
		</div>
		<!-- game canvas insert -->
		<div ref="div"></div>
	</q-page>
</template>

<script>
	import * as BangGame from 'bangbangboom-game';
	import RecordItem from 'components/Records/RecordItem.vue';
	import { fullscreen } from 'src/lib/Utils';

	let game = null;
	let canvas = null;

	export default {
		name: 'PageGame',
		components: { RecordItem },
		data() {
			return {
				records: [
					{
						perfect: 114,
						great: 0,
						good: 0,
						bad: 0,
						miss: 514,
						maxCombo: 10,
						score: 19198,
						type: 0
					}
				]
			};
		},
		methods: {
			addRecord(record) {
				this.records.push(record);
			}
		},
		mounted() {
			let GameLoadConfig = this.$store.state.GameLoadConfig;
			let { game: GameConfig, ui } = this.$q.localStorage.getItem(
				'settings'
			);
			GameConfig.onRecord = this.addRecord;
			if (ui.autoFullscreen) {
				fullscreen(this);
			}
			if (!GameLoadConfig) return;
			let div = this.$refs.div;
			canvas = document.createElement('canvas');
			canvas.id = 'game';
			canvas.style.height = '100%';
			canvas.style.width = '100%';
			div.appendChild(canvas);
			game = new BangGame.Game(canvas, GameConfig, GameLoadConfig);
			game.start();
			game.ondestroyed = () => {
				div.removeChild(canvas);
			};
		},
		beforeDestroy() {
			game.destroy();
			game.ondestroyed = null;
		}
	};
</script>

<style>
	canvas#game {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9999999;
	}
</style>
