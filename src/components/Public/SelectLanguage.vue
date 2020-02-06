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
			list: [
				{
					label: 'English',
					name: 'en-us'
				},
				{
					label: '简体中文',
					name: 'zh-cn'
				},
				{
					label: '日本語',
					name: 'ja-jp'
				}
			]
		}),
		methods: {
			changeLanguage (val) {
				this.$i18n.locale = val;
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
