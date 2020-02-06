<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title>
					<span class="non-selectable" style="font-size: 16px;">BanGround Player</span>
				</q-toolbar-title>
				<q-btn @click="language" class="q-mr-sm" color="white" flat icon="mdi-translate" round/>
				<q-btn @click="settings" color="white" flat icon="mdi-settings" round/>
			</q-toolbar>
		</q-header>

		<q-page-container class="q-px-sm" style="max-width: 1280px; margin: auto">
			<router-view/>
		</q-page-container>
		<select-language v-model="showLanguage"/>
		<settings v-model="showSettings"/>
		<guide :show-settings="showSettings" @settings="settings" v-if="showGuide"/>
	</q-layout>
</template>

<script>
	import SelectLanguage from 'components/Public/SelectLanguage';
	import Settings from 'components/Public/Settings';
	import Guide from 'components/Public/Guide';

	export default {
		name: 'Layout',
		components: { SelectLanguage, Settings, Guide },
		data () {
			return {
				showLanguage: false,
				showSettings: false,
				showGuide: false
			};
		},
		methods: {
			language () {
				this.showLanguage = true;
			},
			settings (cb) {
				this.showSettings = true;
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
