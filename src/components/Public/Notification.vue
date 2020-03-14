<template>
	<q-dialog fixed persistent v-model="dialog">
		<q-card class="q-px-sm"
		        style="width: 100%; max-width: 480px;">
			<q-card-section class="row items-center">
				<div class="text-h6">{{ $t('public.notification.title') }}</div>
				<q-space/>
				<q-btn dense flat icon="mdi-close" round v-close-popup/>
			</q-card-section>
			<q-separator/>
			<q-card-section class="scroll q-px-sm q-py-md" style="max-height: calc(100vh - 200px)">
				<div class="text-center" v-if="notifications === null">
					<q-spinner-facebook
						color="primary"
						size="2em"/>
				</div>
				<div v-else>
					<q-card :key="key" bordered class="link" flat v-for="(item, key) in notifications">
						<q-card-section>
							<div class="text-h6">{{ item[$i18n.locale].title || item.en.title }}</div>
						</q-card-section>

						<q-card-section class="q-pb-none"
						                v-html="markdown(item[$i18n.locale].content || item.en.content)">
						</q-card-section>

						<q-separator/>

						<q-card-actions v-if="!readNotificationList.includes(item.time)" vertical>
							<q-btn @click="read(item.time)" flat>{{ $t('public.notification.mark') }}</q-btn>
						</q-card-actions>
					</q-card>
					<q-btn :label="$t('public.notification.all')" @click="readAll"
					       class="full-width q-mt-md" color="primary" unelevated/>
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
	import showdown from 'showdown';

	showdown.setOption('openLinksInNewWindow', true);
	let converter = new showdown.Converter();
	export default {
		name: 'Notification',
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
			notifications: null
		}),
		methods: {
			markdown (text) {
				return converter.makeHtml(text);
			},
			read (time) {
				this.$store.commit('addReadNotification', [time]);
			},
			readAll () {
				this.$store.commit('addReadNotification', this.notifications.map(v => v.time));
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
			},
			readNotificationList () {
				return this.$store.state.readNotificationList;
			}
		},
		async beforeMount () {
			let { data } = await this.$a.get('/api/notifications');
			this.notifications = data;
			if (data.map(v => v.time).some(v => !this.readNotificationList.includes(v))) {
				this.dialog = true;
			}
		}
	};
</script>

<style scoped>

</style>
