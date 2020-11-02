<template>
	<div>
		<q-select
			:label="$t('tools.convert.from')"
			:options="options"
			behavior="menu"
			v-model="from"
		/>
		<q-select
			:label="$t('tools.convert.to')"
			:options="options"
			behavior="menu"
			class="q-py-sm"
			v-model="to"
		/>
		<q-file
			:label="$t('tools.convert.fileInput')"
			accept=".txt"
			v-if="from.value === 'bbb'"
			v-model="fromFile"
		/>
		<q-input
			:label="$t('home.play.local.mapSource')"
			class="q-py-sm"
			outlined
			rows="5"
			type="textarea"
			v-if="from.value === 'bd'"
			v-model="fromText"
		/>
		<q-field
			:label="$t('tools.convert.convertResult')"
			@focus="selectText"
			class="q-pt-md"
			outlined
			stack-label
			v-if="to.value === 'bd' && converted"
		>
			<template v-slot:control>
				<textarea
					:value="toData || $t('tools.convert.noInput')"
					class="readonly-textarea"
					readonly
					ref="result"
					rows="5"
				/>
			</template>
		</q-field>
		<p class="q-my-sm text-negative" v-if="from.value === to.value">
			{{ $t('tools.convert.serious') }}
		</p>
		<q-btn
			:label="$t('tools.convert.convert')"
			@click="convert"
			class="full-width q-mt-md"
			color="primary"
			unelevated
			v-if="from.value === 'bd' && !converted"
		/>
		<q-btn
			:label="$t('tools.convert.download')"
			@click="download"
			class="full-width q-mt-md"
			color="primary"
			unelevated
			v-else
		/>
	</div>
</template>

<script>
	import bestdori2bbb from 'src/lib/bestdori2bbb';
	import bbb2bestdori from 'src/lib/bbb2bestdori';
	import { readFile } from 'src/lib/Utils';
	import FileSaver from 'file-saver';

	export default {
		name: 'PageToolsConvert',
		data: function() {
			return {
				options: [
					{
						label: 'bangbangboom',
						value: 'bbb'
					},
					{
						label: 'Bestdori',
						value: 'bd'
					}
				],
				from: {
					label: 'bangbangboom',
					value: 'bbb'
				},
				to: {
					label: 'Bestdori',
					value: 'bd'
				},
				converted: false,
				fromFile: null,
				fromText: '',
				toData: ''
			};
		},
		watch: {
			fromText() {
				this.converted = false;
			},
			fromFile() {
				this.bbb2bd();
			},
			'to.value'() {
				if (this.from.value === 'bbb') {
					this.bbb2bd();
				} else {
					this.converted = false;
				}
			}
		},
		methods: {
			showError(e) {
				let error = JSON.parse(e.message);
				this.$q.notify({
					message: this.$t(
						'tools.convert.error.' + error.key,
						error.data
					)
				});
			},
			selectText() {
				this.$refs.result.select();
			},
			download() {
				let blob = new Blob([this.toData], {
					type: 'text/plain;charset=utf-8'
				});
				FileSaver.saveAs(
					blob,
					'map.' + (this.to.value === 'bbb' ? 'txt' : 'json')
				);
			},
			convert() {
				if (this.to.value === 'bbb') {
					try {
						this.toData = bestdori2bbb(JSON.parse(this.fromText));
					} catch (e) {
						this.showError(e);
						return;
					}
				} else {
					this.toData = this.fromText;
				}
				this.$q.notify({
					message: this.$t('tools.convert.succeeded')
				});
				this.converted = true;
			},
			async bbb2bd() {
				if (!this.fromFile) return;
				let text = await readFile(this.fromFile, 'text');
				if (this.to.value === 'bd') {
					try {
						this.toData = bbb2bestdori(text);
					} catch (e) {
						this.showError(e);
					}
				} else {
					this.toData = text;
				}
			}
		}
	};
</script>

<style scoped>
	.readonly-textarea {
		appearance: none;
		outline: none;
		background-color: transparent;
		border: none;
		width: 100%;
		resize: none;
	}
</style>
