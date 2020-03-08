<template>
	<q-page>
		<div ref="div"></div>
	</q-page>
</template>

<script>
	import * as BangGame from 'bangbangboom-game';
	import { fullscreen } from 'src/lib/Utils';

	let game = null;
	let canvas = null;

	export default {
		name: 'Page',
		mounted () {
			let GameLoadConfig = this.$store.state.GameLoadConfig;
			let { game: GameConfig, ui } = this.$q.localStorage.getItem('settings');
			if (ui.autoFullscreen) {
				fullscreen(this);
			}
			if (!GameLoadConfig) return;
			GameConfig.resolution = GameConfig.resolution ? 2 : 1;
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
		beforeDestroy () {
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
