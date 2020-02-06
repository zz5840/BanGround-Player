<template>
	<q-dialog fixed persistent v-model="dialog">
		<q-card class="q-px-sm"
		        style="width: 100%; max-width: 480px;">
			<q-card-section class="row items-center">
				<div class="text-h6">{{ $t('public.settings.title') }}</div>
				<q-space/>
				<q-btn dense flat icon="mdi-close" round v-close-popup/>
			</q-card-section>
			<q-separator/>
			<q-card-section class="scroll q-pa-none q-pb-md" style="max-height: calc(100vh - 191px)">
				<q-item-label header>
					{{ $t('public.settings.autoFullscreen') }}
				</q-item-label>
				<q-item dense>
					<q-btn-toggle :options="radioOptions"
					              class="border-toggle"
					              no-caps
					              spread
					              text-color="primary"
					              toggle-color="primary"
					              unelevated
					              v-model="settings.ui.autoFullscreen"/>
				</q-item>
				<q-item-label header>
					{{ $t('public.settings.speed') }}
				</q-item-label>
				<q-item dense>
					<button-value :big-step="0.5"
					              :digits="1"
					              :max="11"
					              :min="1"
					              :small-step="0.1"
					              v-model="settings.game.speed"/>
				</q-item>
				<q-item-label header>
					{{ $t('public.settings.noteScale') }}
				</q-item-label>
				<q-item dense>
					<button-value :big-step="0.5"
					              :digits="2"
					              :label="Math.round(settings.game.noteScale * 100) + '%'"
					              :max="2"
					              :min="0.1"
					              :small-step="0.1"
					              v-model="settings.game.noteScale"/>
				</q-item>
				<q-item-label header>
					{{ $t('public.settings.judgeOffset') }}
				</q-item-label>
				<q-item dense>
					<button-value :big-step="0.05"
					              :digits="3"
					              :label="settings.game.judgeOffset * 1000 + ''"
					              :max="10"
					              :min="-10"
					              :small-step="0.01"
					              v-model="settings.game.judgeOffset"/>
				</q-item>
				<q-item-label header>
					{{ $t('public.settings.visualOffset') }}
				</q-item-label>
				<q-item dense>
					<button-value :big-step="0.05"
					              :digits="3"
					              :label="settings.game.visualOffset * 1000 + ''"
					              :max="10"
					              :min="-10"
					              :small-step="0.01"
					              v-model="settings.game.visualOffset"/>
				</q-item>
				<q-item-label header>
					{{ $t('public.settings.barOpacity') }}
				</q-item-label>
				<q-item dense>
					<button-value :big-step="0.1"
					              :digits="2"
					              :label="Math.round(settings.game.barOpacity * 100) + '%'"
					              :max="1"
					              :min="0.2"
					              :small-step="0.05"
					              v-model="settings.game.barOpacity"/>
				</q-item>
				<q-item-label header>
					{{ $t('public.settings.effectVolume') }}
				</q-item-label>
				<q-item dense>
					<button-value :big-step="0.1"
					              :digits="2"
					              :label="Math.round(settings.game.effectVolume * 100) + '%'"
					              :max="1"
					              :min="0"
					              :small-step="0.05"
					              v-model="settings.game.effectVolume"/>
				</q-item>
				<q-item-label header>
					{{ $t('public.settings.backgroundDim') }}
				</q-item-label>
				<q-item dense>
					<button-value :big-step="0.1"
					              :digits="2"
					              :label="Math.round(settings.game.backgroundDim * 100) + '%'"
					              :max="1"
					              :min="0.2"
					              :small-step="0.05"
					              v-model="settings.game.backgroundDim"/>
				</q-item>
				<q-item-label header>
					{{ $t('public.settings.showSimLine') }}
				</q-item-label>
				<q-item dense>
					<q-btn-toggle :options="radioOptions"
					              class="border-toggle"
					              no-caps
					              spread
					              text-color="primary"
					              toggle-color="primary"
					              unelevated
					              v-model="settings.game.showSimLine"/>
				</q-item>
				<q-item-label header>
					{{ $t('public.settings.beatNote') }}
				</q-item-label>
				<q-item dense>
					<q-btn-toggle :options="radioOptions"
					              class="border-toggle"
					              no-caps
					              spread
					              text-color="primary"
					              toggle-color="primary"
					              unelevated
					              v-model="settings.game.beatNote"/>
				</q-item>
				<q-item-label header>
					{{ $t('public.settings.laneEffect') }}
				</q-item-label>
				<q-item dense>
					<q-btn-toggle :options="radioOptions"
					              class="border-toggle"
					              no-caps
					              spread
					              text-color="primary"
					              toggle-color="primary"
					              unelevated
					              v-model="settings.game.laneEffect"/>
				</q-item>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
	import ButtonValue from 'components/Common/ButtonValue';

	export default {
		name: 'Settings',
		components: { ButtonValue },
		model: {
			prop: 'show',
			event: 'change'
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data: function () {
			return {
				radioOptions: [
					{ label: this.$t('public.radioOff'), value: false },
					{ label: this.$t('public.radioOn'), value: true }
				],
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
						laneEffect: false
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
				handler: function () {
					this.$q.localStorage.set('settings', this.settings);
				}
			}
		},
		computed: {
			dialog: {
				get () {
					return this.show;
				},
				set (val) {
					this.$emit('change', val);
				}
			}
		},
		beforeMount () {
			let settings = this.$q.localStorage.getItem('settings');
			if (settings) {
				this.settings = settings;
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.border-toggle
		border 1px solid $primary
		width 100%
		height 36px
</style>
