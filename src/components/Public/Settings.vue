<template>
	<q-dialog fixed persistent v-model="dialog">
		<q-card class="q-px-sm" style="width: 100%; max-width: 480px;">
			<q-card-section class="row items-center">
				<div class="text-h6">{{ $t('public.settings.title') }}</div>
				<q-space />
				<q-btn dense flat icon="mdi-close" round v-close-popup />
			</q-card-section>
			<q-separator />
			<q-card-section
				class="scroll q-pa-none q-pb-md"
				style="max-height: calc(100vh - 200px)"
			>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>

	export default {
		name: 'Settings',
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
					{ label: this.$t('public.radioOff'), value: false },
					{ label: this.$t('public.radioOn'), value: true }
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

<style lang="stylus" scoped>
	.border-toggle
		border 1px solid $primary
		width 100%
		height 36px
</style>
