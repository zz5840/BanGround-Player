<template>
	<q-layout view="hHh lpR lFf">
		<q-header elevated class="bg-primary text-white">
			<q-toolbar>
				<q-btn dense flat round icon="mdi-menu" @click="toggleDrawer" />

				<q-toolbar-title>
					<span class="non-selectable" style="font-size: 16px;">BanGround Player</span>
				</q-toolbar-title>
				<template v-if="$q.screen.gt.xs">
					<q-btn @click="fav" class="q-mr-xs" color="white" flat icon="mdi-heart" round/>
					<q-btn @click="language" class="q-mr-xs" color="white" flat icon="mdi-translate" round/>
					<q-btn @click="settings" class="q-mr-xs" color="white" flat icon="mdi-settings" round/>
					<q-btn @click="notification" class="q-mr-xs" color="white" flat icon="mdi-bell" round/>
				</template>
				<q-btn @click="fullscreen" color="white" flat icon="mdi-fullscreen" round/>
				<q-btn color="white" flat icon="mdi-dots-vertical" round v-if="$q.screen.xs">
					<q-popup-proxy :breakpoint="0">
						<q-list>
							<q-item @click="fav" clickable v-close-popup>
								<q-item-section avatar>
									<q-icon name="mdi-heart"/>
								</q-item-section>
								<q-item-section>{{ $t('public.favourite.title') }}</q-item-section>
							</q-item>

							<q-item @click="language" clickable v-close-popup>
								<q-item-section avatar>
									<q-icon name="mdi-translate"/>
								</q-item-section>
								<q-item-section>{{ $t('public.language') }}</q-item-section>
							</q-item>

							<q-item @click="settings" clickable v-close-popup>
								<q-item-section avatar>
									<q-icon name="mdi-settings"/>
								</q-item-section>
								<q-item-section>{{ $t('public.settings.title') }}</q-item-section>
							</q-item>

							<q-item @click="notification" clickable v-close-popup>
								<q-item-section avatar>
									<q-icon name="mdi-bell"/>
								</q-item-section>
								<q-item-section>{{ $t('public.notification.title') }}</q-item-section>
							</q-item>
						</q-list>
					</q-popup-proxy>
				</q-btn>
			</q-toolbar>
		</q-header>

		<q-drawer show-if-above v-model="showLeftDrawer" :mini="miniLeftDrawer" side="left" bordered class="left-drawer">
			<q-scroll-area class="fit">
				<q-list>
					<template v-for="(item, index) in menuList">
						<q-item :key="index" clickable :to="item.to" exact
						        active-class="drawer-active text-primary" v-ripple>
							<q-item-section avatar>
								<q-icon :name="item.icon" color="" />
							</q-item-section>
							<q-item-section>
								{{ $t(item.name + '.title') }}
							</q-item-section>
						</q-item>
						<q-separator :key="'sep' + index" />
					</template>
				</q-list>
				</q-scroll-area>
		</q-drawer>

		<q-page-container class="q-px-sm" style="max-width: 1280px; margin: auto">
			<router-view/>
		</q-page-container>

		<favourite v-model="showFav"/>
		<notification v-model="showNotification"/>
		<select-language v-model="showLanguage"/>
		<settings v-model="showSettings"/>
		<guide v-if="showGuide"/>
	</q-layout>
</template>

<script>
	import SelectLanguage from 'components/Public/SelectLanguage';
	import Settings from 'components/Public/Settings';
	import Guide from 'components/Public/Guide';
	import Favourite from 'components/Public/Favourite';
	import Notification from 'components/Public/Notification';
	import { mapMutations, mapState } from 'vuex';
	import { fullscreen } from 'src/lib/Utils';

	export default {
		name: 'Layout',
		components: { SelectLanguage, Settings, Guide, Favourite, Notification },
		data () {
			return {
				showLanguage: false,
				showGuide: false,
				ifShowSettings: false,
				showFav: false,
				showNotification: false,
				showLeftDrawer: this.$q.screen.gt.sm,
				miniLeftDrawer: !this.$q.screen.gt.sm,
				menuList: [
					{
						icon: 'mdi-music',
						name: 'play',
						to: '/'
					},
					{
						icon: 'mdi-share-variant',
						name: 'share',
						to: '/share'
					},
					{
						icon: 'mdi-heart',
						name: 'fav',
						to: '/fav'
					}
				]
			};
		},
		methods: {
			fav () {
				this.showFav = true;
			},
			language () {
				this.showLanguage = true;
			},
			fullscreen () {
				fullscreen(this);
			},
			notification () {
				this.showNotification = true;
			},
			toggleDrawer () {
				if (this.$q.screen.gt.sm) {
					this.miniLeftDrawer = !this.miniLeftDrawer;
				} else {
					this.showLeftDrawer = !this.showLeftDrawer;
				}
			},
			...mapMutations({
				settings: 'openSettings'
			})
		},
		computed: {
			showSettings: {
				...mapState({ get: 'showSettings' }),
				...mapMutations({ set: 'setSettings' })
			}
		},
		beforeMount () {
			let lang = this.$q.localStorage.getItem('lang');
			if (!lang) {
				this.showGuide = true;
			} else {
				this.$i18n.locale = lang;
			}
		}
	};
</script>

<style scoped>
	.left-drawer .q-icon {
		color: rgb(137, 137, 137);
		transition: color 0.3s;
	}

	.drawer-active .q-icon {
		color: inherit;
	}
</style>
