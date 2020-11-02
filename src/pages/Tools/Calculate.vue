<template>
	<div>
		<q-input :label="$t('tools.calc.bpm')" type="number" v-model="bpm"/>
		<q-input :label="$t('tools.calc.offset')" type="number" v-model="offset"/>
		<i18n class="q-mt-md" path="tools.calc.result" tag="p">
			<code :place="0">{{ result[0] }}s</code>
			<code :place="1">{{ result[1] }}s</code>
		</i18n>
	</div>
</template>

<script>
	import { accurateFloat } from 'src/lib/Utils';

	export default {
		name: 'PageToolsCalculate',
		data: () => ({
			bpm: 60,
			offset: 0,
			result: [0, 0]
		}),
		watch: {
			bpm () {
				this.calc();
			},
			offset () {
				this.calc();
			}
		},
		methods: {
			calc () {
				let beat = accurateFloat((this.offset * this.bpm) / 60);
				let secondPerBeat = accurateFloat(60 / this.bpm);
				let up = Math.ceil(beat);
				let down = Math.floor(beat);
				let upTime = accurateFloat(up * secondPerBeat);
				let downTime = accurateFloat(down * secondPerBeat);
				let add = accurateFloat(upTime - this.offset, 3);
				let remove = accurateFloat(this.offset - downTime, 3);
				add = !isNaN(add) ? add : 0;
				remove = !isNaN(remove) ? remove : 0;
				this.result = [add, remove];
			}
		}

	};
</script>

<style scoped>
	code {
		background-color: #f5f5f5;
		color: #bd4147;
		font-family: Consolas, monospace;
		padding: 0 4px;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		border-radius: 2px;
		-webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
	}
</style>
