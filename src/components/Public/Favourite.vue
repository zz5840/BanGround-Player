<template>
	<q-dialog fixed persistent v-model="dialog">
		<q-card class="q-px-sm"
		        style="width: 100%; max-width: 480px;">
			<q-card-section class="row items-center">
				<div class="text-h6">{{ $t('public.favourite.title') }}</div>
				<q-space/>
				<q-btn dense flat icon="mdi-close" round v-close-popup/>
			</q-card-section>
			<q-separator/>
			<q-card-section class="scroll q-px-sm q-py-md" style="max-height: calc(100vh - 200px)">
				<q-btn-toggle
					:options="options"
					class="q-mb-md difficulty-select"
					spread
					text-color="primary"
					toggle-color="primary"
					unelevated
					v-model="toggle"/>
				<div v-if="toggle === 'favourite'">
					<q-list bordered separator>
						<div class="text-center q-my-sm" v-if="favList.length === 0">
							{{ $t('public.favourite.empty', { name: $t('public.favourite.title') }) }}
						</div>
						<q-slide-item :key="key"
						              @right="({reset}) => delFav(item, key, reset)"
						              right-color="red"
						              v-for="(item, key) in favList" v-ripple>
							<template v-slot:right>
								<q-icon name="mdi-delete"/>
							</template>

							<q-item @click="goto(item.id, item.type)" clickable>
								<q-item-section>
									<q-item-label>{{ item.name }}</q-item-label>
									<q-item-label caption>
										{{ $t('home.play.bestdori.type.' + item.type) }} - {{ item.id }}
									</q-item-label>
								</q-item-section>
							</q-item>
						</q-slide-item>
					</q-list>
					<div class="q-mt-md text-center">{{ $t('public.favourite.slideRight') }}</div>
				</div>
				<div v-if="toggle === 'history'">
					<q-list bordered separator>
						<div class="text-center q-my-sm" v-if="historyList.length === 0">
							{{ $t('public.favourite.empty', { name: $t('public.favourite.history') }) }}
						</div>
						<q-item :key="key" @click="goto(item.id, item.type)" clickable
						        v-for="(item, key) in historyList" v-ripple>
							<q-item-section>
								<q-item-label>{{ item.name }}</q-item-label>
								<q-item-label caption>
									{{ $t('home.play.bestdori.type.' + item.type) }} - {{ item.id }}
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
					<div class="q-mt-md text-center">{{ $t('public.favourite.showLimit') }}</div>
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'Favourite',
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
		data: () => ({
			toggle: 'favourite'
		}),
		methods: {
			goto (id, type) {
				this.dialog = false;
				this.$store.commit('updatePlayDataBestdoriId', id);
				this.$store.commit('updatePlayDataBestdoriMapType', type);
				this.$store.commit('updatePlayDataLoadInfo', true);
				this.$store.commit('updateTab', 'play');
			},
			delFav (item, key, reset) {
				this.$store.commit('delFav', key);
				this.$q.notify(this.$t('public.favourite.deleted', { name: item.name }));
				reset();
			},
			test () {
				console.log(123);
			}
		},
		computed: {
			...mapState(['favList', 'historyList']),
			options () {
				return [
					{ label: this.$t('public.favourite.title'), value: 'favourite' },
					{ label: this.$t('public.favourite.history'), value: 'history' }
				];
			},
			dialog: {
				get () {
					return this.show;
				},
				set (val) {
					this.$emit('change', val);
				}
			}
		}
	};
</script>
