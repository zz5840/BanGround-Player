<template>
	<q-page class="q-pb-lg">
		<q-item-label header>
			{{ $t('settings.autoFullscreen') }}
		</q-item-label>
		<q-item dense>
			<q-btn-toggle
				:options="radioOptions"
				class="select-switch-btn full-width"
				no-caps
				spread
				text-color="primary"
				toggle-color="primary"
				unelevated
				v-model="settings.ui.autoFullscreen"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.speed') }}
		</q-item-label>
		<q-item dense>
			<button-value
				:big-step="0.5"
				:digits="1"
				:max="11"
				:min="1"
				:small-step="0.1"
				v-model="settings.game.speed"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.noteScale') }}
		</q-item-label>
		<q-item dense>
			<button-value
				:big-step="0.5"
				:digits="2"
				:label="Math.round(settings.game.noteScale * 100) + '%'"
				:max="2"
				:min="0.1"
				:small-step="0.1"
				v-model="settings.game.noteScale"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.judgeOffset') }}
		</q-item-label>
		<q-item dense>
			<button-value
				:big-step="0.05"
				:digits="3"
				:label="settings.game.judgeOffset * 1000 + ''"
				:max="10"
				:min="-10"
				:small-step="0.01"
				v-model="settings.game.judgeOffset"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.visualOffset') }}
		</q-item-label>
		<q-item dense>
			<button-value
				:big-step="0.05"
				:digits="3"
				:label="settings.game.visualOffset * 1000 + ''"
				:max="10"
				:min="-10"
				:small-step="0.01"
				v-model="settings.game.visualOffset"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.barOpacity') }}
		</q-item-label>
		<q-item dense>
			<button-value
				:big-step="0.1"
				:digits="2"
				:label="Math.round(settings.game.barOpacity * 100) + '%'"
				:max="1"
				:min="0.2"
				:small-step="0.05"
				v-model="settings.game.barOpacity"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.effectVolume') }}
		</q-item-label>
		<q-item dense>
			<button-value
				:big-step="0.1"
				:digits="2"
				:label="Math.round(settings.game.effectVolume * 100) + '%'"
				:max="1"
				:min="0"
				:small-step="0.05"
				v-model="settings.game.effectVolume"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.backgroundDim') }}
		</q-item-label>
		<q-item dense>
			<button-value
				:big-step="0.1"
				:digits="2"
				:label="Math.round(settings.game.backgroundDim * 100) + '%'"
				:max="1"
				:min="0.2"
				:small-step="0.05"
				v-model="settings.game.backgroundDim"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.showSimLine') }}
		</q-item-label>
		<q-item dense>
			<q-btn-toggle
				:options="radioOptions"
				class="select-switch-btn full-width"
				no-caps
				spread
				text-color="primary"
				toggle-color="primary"
				unelevated
				v-model="settings.game.showSimLine"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.beatNote') }}
		</q-item-label>
		<q-item dense>
			<q-btn-toggle
				:options="radioOptions"
				class="select-switch-btn full-width"
				no-caps
				spread
				text-color="primary"
				toggle-color="primary"
				unelevated
				v-model="settings.game.beatNote"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.mirror') }}
		</q-item-label>
		<q-item dense>
			<q-btn-toggle
				:options="radioOptions"
				class="select-switch-btn full-width"
				no-caps
				spread
				text-color="primary"
				toggle-color="primary"
				unelevated
				v-model="settings.game.mirror"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.laneEffect') }}
		</q-item-label>
		<q-item dense>
			<q-btn-toggle
				:options="radioOptions"
				class="select-switch-btn full-width"
				no-caps
				spread
				text-color="primary"
				toggle-color="primary"
				unelevated
				v-model="settings.game.laneEffect"
			/>
		</q-item>
		<q-item-label header>
			{{ $t('settings.resolution') }}
		</q-item-label>
		<q-item dense>
			<q-btn-toggle
				:options="radioOptions"
				class="select-switch-btn full-width"
				no-caps
				spread
				text-color="primary"
				toggle-color="primary"
				unelevated
				v-model="settings.game.resolution"
			/>
		</q-item>
	</q-page>
</template>

<script>
	import ButtonValue from 'components/Common/ButtonValue';

	export default {
		name: 'PageSettings',
		components: { ButtonValue },
		data: function() {
			return {
				settings: {
					game: {
						speed: 10,
						noteScale: 1,
						judgeOffset: 0,
						visualOffset: 0,
						barOpacity: 0.8,
						effectVolume: 0.7,
						backgroundDim: 0.7,
						showSimLine: true,
						beatNote: false,
						mirror: false,
						laneEffect: false,
						resolution: false
					},
					ui: {
						autoFullscreen: false
					}
				}
			};
		},
		watch: {
			settings: {
				deep: true,
				handler: function() {
					this.$q.localStorage.set('settings', this.settings);
				}
			}
		},
		computed: {
			radioOptions() {
				return [
					{ label: this.$t('public.ui.radioOff'), value: false },
					{ label: this.$t('public.ui.radioOn'), value: true }
				];
			},
			dialog: {
				get() {
					return this.show;
				},
				set(val) {
					this.$emit('change', val);
				}
			}
		},
		beforeMount() {
			let settings = this.$q.localStorage.getItem('settings');
			if (settings) {
				this.settings = settings;
			} else {
				this.$q.localStorage.set('settings', this.settings);
			}
		}
	};
</script>
