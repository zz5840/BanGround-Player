<template>
	<q-page class="q-pt-md">
		<q-tabs active-color="primary"
		        align="justify"
		        class="text-grey-7"
		        indicator-color="primary"
		        v-model="tab">
			<q-tab :label="$t('home.play.title')"
			       icon="mdi-music"
			       name="play"/>
			<q-tab :label="$t('home.convert.title')"
			       icon="mdi-file-swap"
			       name="convert"/>
			<q-tab :label="$t('home.space.title')"
			       icon="mdi-keyboard-space"
			       name="space"/>
			<q-tab :label="$t('home.about.title')"
			       icon="mdi-information" name="about"/>
		</q-tabs>
		<q-tab-panels
			animated
			style="background: transparent;"
			transition-next="jump-up"
			transition-prev="jump-up"
			v-model="tab">
			<q-tab-panel class="q-pa-sm" name="play">
				<play/>
			</q-tab-panel>
			<q-tab-panel class="q-pa-sm" name="convert">
				<convert/>
			</q-tab-panel>
			<q-tab-panel class="q-pa-sm" name="space">
				<space/>
			</q-tab-panel>
			<q-tab-panel class="q-pa-sm" name="about">
				<about/>
			</q-tab-panel>
		</q-tab-panels>
	</q-page>
</template>

<script>
	import Play from 'components/Home/Play';
	import Convert from 'components/Home/Convert';
	import Space from 'components/Home/Space';
	import About from 'components/Home/About';

	export default {
		name: 'PageIndex',
		components: { Play, Space, Convert, About },
		computed: {
			tab: {
				get () {
					return this.$store.state.tab;
				},
				set (val) {
					this.$store.commit('updateTab', val);
				}
			}
		}
	};
</script>
