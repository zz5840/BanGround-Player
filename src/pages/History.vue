<template>
	<q-page class="q-pt-md q-pb-lg">
		<q-list bordered separator class="bg-white">
			<div class="text-center q-my-sm" v-if="historyList.length === 0">
				{{ $t('history.empty') }}
			</div>
			<q-item
				:key="key"
				@click="goto(item.id, item.type)"
				clickable
				v-for="(item, key) in historyList"
				v-ripple
			>
				<q-item-section>
					<q-item-label>{{ item.name }}</q-item-label>
					<q-item-label caption>
						{{ $t('play.bestdori.type.' + item.type) }}
						- {{ item.id }}
					</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
		<div class="q-mt-md text-center">
			{{ $t('history.showLimit') }}
		</div>
	</q-page>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'PageHistory',
		methods: {
			goto(id, type) {
				this.$router.push(`/?type=${type}&id=${id}&autoload=true`);
			}
		},
		computed: {
			...mapState(['historyList'])
		}
	};
</script>
