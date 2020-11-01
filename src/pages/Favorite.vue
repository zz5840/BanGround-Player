<template>
	<q-page class="q-pt-md q-pb-lg">
		<q-list bordered separator class="bg-white">
			<div class="text-center q-my-sm" v-if="favList.length === 0">
				{{ $t('favorite.empty') }}
			</div>
			<q-slide-item
				:key="key"
				@right="({ reset }) => delFav(item, key, reset)"
				right-color="red"
				v-for="(item, key) in favList"
				v-ripple
			>
				<template v-slot:right>
					<q-icon name="mdi-delete" />
				</template>

				<q-item @click="goto(item.id, item.type)" clickable>
					<q-item-section>
						<q-item-label>{{ item.name }}</q-item-label>
						<q-item-label caption>
							{{ $t('play.bestdori.type.' + item.type) }}
							- {{ item.id }}
						</q-item-label>
					</q-item-section>
				</q-item>
			</q-slide-item>
		</q-list>
		<div class="q-mt-md text-center">
			{{ $t('favorite.slideRight') }}
		</div>
	</q-page>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'PageFavorite',
		methods: {
			goto(id, type) {
				this.$router.push(`/?type=${type}&id=${id}&autoload=true`);
			},
			delFav(item, key, reset) {
				this.$store.commit('delFav', key);
				this.$q.notify(
					this.$t('favorite.deleted', { name: item.name })
				);
				reset();
			}
		},
		computed: {
			...mapState(['favList'])
		}
	};
</script>
