<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title>
					<span class="non-selectable" style="font-size: 16px;">BanGround Player</span>
				</q-toolbar-title>
				<q-btn @click="language" class="q-mr-sm" color="white" flat icon="mdi-translate" round/>
				<q-btn @click="settings" class="q-mr-sm" color="white" flat icon="mdi-settings" round/>
				<q-btn @click="fullscreen" color="white" flat icon="mdi-fullscreen" round/>
			</q-toolbar>
		</q-header>
		<q-page-container class="q-px-sm" style="max-width: 1280px; margin: auto">
			<router-view/>
		</q-page-container>
		<select-language v-model="showLanguage"/>
		<settings v-if="ifShowSettings" v-model="showSettings"/>
		<guide v-if="showGuide"/>
	</q-layout>
</template>

<script>
	import SelectLanguage from 'components/Public/SelectLanguage';
	import Settings from 'components/Public/Settings';
	import Guide from 'components/Public/Guide';
	import { mapMutations, mapState } from 'vuex';
	import { fullscreen } from 'src/lib/Utils';

	export default {
		name: 'Layout',
		components: { SelectLanguage, Settings, Guide },
		data () {
			return {
				showLanguage: false,
				showGuide: false,
				ifShowSettings: false
			};
		},
		watch: {
			showSettings (val) {
				// 解决v-if为false时元素会直接消失 没有动画的问题
				let time = this.ifShowSettings ? 300 : 0;
				setTimeout(() => {
					this.ifShowSettings = val;
				}, time);
			}
		},
		methods: {
			language () {
				this.showLanguage = true;
			},
			fullscreen () {
				fullscreen(this);
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
