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
			<q-markup-table v-for="(v, i) in records" :key="i">
				<tbody v-if="$q.screen.sm">
					<tr>
						<th>Perfect</th>
						<th>Great</th>
						<th>Good</th>
						<th>Bad</th>
						<th>Miss</th>
						<th>Max Combo</th>
						<th rowspan="2">Full Combo <br />All Perfect</th>
					</tr>
					<tr>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr>
						<td class="text-bold">Perfect</td>
						<td>1</td>
					</tr>
					<tr>
						<td class="text-bold">Great</td>
						<td>1</td>
					</tr>
					<tr>
						<td class="text-bold">Good</td>
						<td>1</td>
					</tr>
					<tr>
						<td class="text-bold">Bad</td>
						<td>1</td>
					</tr>
					<tr>
						<td class="text-bold">Miss</td>
						<td>1</td>
					</tr>
					<tr>
						<td class="text-bold">Max Combo</td>
						<td>1</td>
					</tr>
					<tr>
						<td colspan="2">Full Combo</td>
					</tr>
				</tbody>
			</q-markup-table>
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
	import { fullscreen } from 'src/lib/Utils';

	let game = null;
	let canvas = null;

	export default {
		name: 'PageGame',
		data() {
			return {
				records: [1]
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
				this.$router.go(-1);
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
