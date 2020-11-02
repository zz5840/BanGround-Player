<template>
	<q-page class="q-pt-md q-pb-lg">
		<div class="text-center" v-if="announcements === null">
			<q-spinner-facebook color="primary" size="2em" />
		</div>
		<div v-else>
			<q-card
				:key="key"
				bordered
				class="link q-mb-md"
				flat
				v-for="(item, key) in announcements"
			>
				<q-card-section>
					<div class="text-h6">{{ item[lang].title }}</div>
				</q-card-section>

				<q-card-section
					class="q-pb-none"
					v-html="markdown(item[lang].content)"
				>
				</q-card-section>

				<q-separator />

				<q-card-actions
					v-if="!readAnnouncementsList.includes(item.time)"
					vertical
				>
					<q-btn @click="read(item.time)" flat>{{
						$t('announcement.mark')
					}}</q-btn>
				</q-card-actions>
			</q-card>
			<q-btn
				:label="$t('announcement.all')"
				@click="readAll"
				class="full-width"
				color="primary"
				unelevated
			/>
		</div>
	</q-page>
</template>

<script>
	import showdown from 'showdown';

	showdown.setOption('openLinksInNewWindow', true);
	let converter = new showdown.Converter();

	export default {
		name: 'PageAnnouncements',
		data: () => ({
			announcements: null
		}),
		methods: {
			markdown(text) {
				return converter.makeHtml(text);
			},
			read(time) {
				this.$store.commit('addReadNotification', [time]);
			},
			readAll() {
				this.$store.commit(
					'addReadNotification',
					this.notifications.map((v) => v.time)
				);
			}
		},
		computed: {
			readAnnouncementsList() {
				return this.$store.state.readNotificationList;
			},
			lang() {
				return ['zh', 'en'].includes(this.$i18n.locale)
					? this.$i18n.locale
					: 'en';
			}
		},
		async beforeMount() {
			let { data } = await this.$a.get('/api/notifications');
			this.announcements = data;
			if (
				data
					.map((v) => v.time)
					.some((v) => !this.readAnnouncementsList.includes(v))
			) {
				this.dialog = true;
			}
		}
	};
</script>
