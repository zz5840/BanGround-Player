<template>
	<q-layout view="hHh lpR lFf">
		<q-header elevated class="bg-primary text-white">
			<q-toolbar>
				<q-btn dense flat round icon="mdi-menu" @click="toggleDrawer" />

				<q-toolbar-title>
					<span class="non-selectable" style="font-size: 16px;"
						>BanGround Player</span
					>
				</q-toolbar-title>
				<template v-if="$q.screen.gt.xs">
					<q-btn
						@click="language"
						class="q-mr-xs"
						color="white"
						flat
						icon="mdi-translate"
						round
					/>
				</template>
				<q-btn
					@click="fullscreen"
					color="white"
					flat
					icon="mdi-fullscreen"
					round
				/>
				<q-btn
					color="white"
					flat
					icon="mdi-dots-vertical"
					round
					v-if="$q.screen.xs"
				>
					<q-popup-proxy :breakpoint="0">
						<q-list>
							<q-item @click="language" clickable v-close-popup>
								<q-item-section avatar>
									<q-icon name="mdi-translate" />
								</q-item-section>
								<q-item-section>{{
									$t('public.language')
								}}</q-item-section>
							</q-item>
						</q-list>
					</q-popup-proxy>
				</q-btn>
			</q-toolbar>
		</q-header>

		<q-drawer
			show-if-above
			v-model="showLeftDrawer"
			:mini="miniLeftDrawer"
			side="left"
			bordered
			class="left-drawer"
		>
			<q-scroll-area class="fit">
				<q-list>
					<template v-for="(item, index) in menuList">
						<q-item
							:key="index"
							clickable
							:to="item.to"
							exact
							active-class="drawer-active text-primary"
							v-ripple
						>
							<q-item-section avatar>
								<q-icon :name="item.icon" color="" />
							</q-item-section>
							<q-item-section>
								{{ $t(item.name + '.title') }}
							</q-item-section>
						</q-item>
						<q-separator
							:key="'sep' + index"
							v-if="item.separator"
						/>
					</template>
				</q-list>
			</q-scroll-area>
		</q-drawer>

		<q-page-container style="max-height: 100vh; overflow-y: scroll">
			<div style="max-width: 1280px; margin: auto" class="q-px-md">
				<router-view />
			</div>
		</q-page-container>

		<select-language v-model="showLanguage" />
		<guide v-if="showGuide" />
	</q-layout>
</template>

<script>
	import SelectLanguage from 'components/Public/SelectLanguage';
	import Guide from 'components/Public/Guide';
	import { fullscreen } from 'src/lib/Utils';

	export default {
		name: 'Layout',
		components: {
			SelectLanguage,
			Guide
		},
		data() {
			return {
				showLanguage: false,
				showGuide: false,
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
						to: '/share',
						separator: true
					},
					{
						icon: 'mdi-heart',
						name: 'favorite',
						to: '/favorite'
					},
					{
						icon: 'mdi-history',
						name: 'history',
						to: '/history',
						separator: true
					},
					{
						icon: 'mdi-settings',
						name: 'settings',
						to: '/settings'
					},
					{
						icon: 'mdi-bell',
						name: 'announcement',
						to: '/announcement'
					},
					{
						icon: 'mdi-information',
						name: 'about',
						to: '/about'
					}
				]
			};
		},
		methods: {
			language() {
				this.showLanguage = true;
			},
			fullscreen() {
				fullscreen(this);
			},
			toggleDrawer() {
				if (this.$q.screen.gt.sm) {
					this.miniLeftDrawer = !this.miniLeftDrawer;
				} else {
					this.showLeftDrawer = !this.showLeftDrawer;
				}
			}
		},
		beforeMount() {
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
