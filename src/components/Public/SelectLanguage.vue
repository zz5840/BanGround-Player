<template>
	<q-dialog position="bottom" v-model="dialog">
		<q-list bordered class="rounded-borders bg-white" padding style="min-width: 350px">
			<q-item-label header>{{ $t('public.language') }}</q-item-label>
			<q-item
				:key="i"
				@click="changeLanguage(item.name)"
				clickable
				v-for="(item, i) in list"
				v-ripple>
				<q-item-section>{{ item.label }}</q-item-section>
			</q-item>
		</q-list>
	</q-dialog>
</template>

<script>
	import { changeLanguage, languages } from 'src/lib/Utils';

	export default {
		name: 'SelectLanguage',
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
			list: languages
		}),
		methods: {
			changeLanguage (val) {
				changeLanguage(this, val);
				this.dialog = false;
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
		}
	};
</script>

<style scoped>

</style>
