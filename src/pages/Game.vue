<template>
	<q-page class="q-pt-md q-pb-lg text-center">
		<p class="text-h6">Song Name</p>
		<p class="text-subtitle2">Artists</p>
		<p>Expert 26</p>
		<p v-if="records.length === 0">
			{{ $t('game.nullRecords') }}
		</p>
		<div class="q-mb-md" v-else>
			<i18n tag="p" path="game.recorded">
				<router-link place="link" to="records" class="link">{{
					$t('records.title')
				}}</router-link>
			</i18n>
			<record-item
				v-for="(v, i) in records"
				:key="i"
				:data="v"
			></record-item>
		</div>
		<q-btn
			:label="$t('game.back')"
			color="primary"
			@click="$router.push('/')"
		/>
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
