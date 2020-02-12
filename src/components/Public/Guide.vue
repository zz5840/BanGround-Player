<template>
	<div>
		<q-dialog persistent v-if="step === 1" v-model="language">
			<q-card>
				<q-card-section>
					<div class="text-h6">{{ $t('public.guide.title') }}</div>
				</q-card-section>
				<q-card-section class="q-pt-none">
					{{ $t('public.guide.selectLanguage') }}
				</q-card-section>
				<q-card-actions align="left" class="float-left">
					<q-btn :key="i"
					       :label="lang.label"
					       @click="changeLanguage(lang.name)"
					       color="primary"
					       flat
					       v-for="(lang, i) in languageList"/>
				</q-card-actions>
				<q-card-actions align="right">
					<q-btn :label="$t('public.guide.next')"
					       @click="step += 1"
					       color="primary"
					       flat/>
				</q-card-actions>
			</q-card>
		</q-dialog>
		<q-dialog persistent v-if="step === 2" v-model="language">
			<q-card>
				<q-card-section>
					<div class="text-h6">{{ $t('public.guide.title') }}</div>
				</q-card-section>
				<q-card-section class="q-pt-none">
					{{ $t('public.guide.changeSettings') }}
				</q-card-section>
				<q-card-actions align="right">
					<q-btn :label="$t('public.guide.skip')"
					       @click="step += 1"
					       color="primary"
					       flat/>
					<q-btn :label="$t('public.ok')"
					       @click="settings"
					       color="primary"
					       flat/>
				</q-card-actions>
			</q-card>
		</q-dialog>
		<q-dialog persistent v-if="step === 3" v-model="language">
			<q-card>
				<q-card-section>
					<div class="text-h6">{{ $t('public.guide.title') }}</div>
				</q-card-section>
				<q-card-section class="q-pt-none">
					{{ $t('public.guide.complete') }}
				</q-card-section>
				<q-card-actions align="right">
					<q-btn :label="$t('public.ok')"
					       @click="step += 1"
					       color="primary"
					       flat/>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
	import { changeLanguage, languages } from 'src/lib/Utils';
	import { mapMutations } from 'vuex';

	export default {
		name: 'Guide',
		data: () => ({
			language: true,
			languageList: languages,
			step: 1
		}),
		methods: {
			changeLanguage (lang) {
				changeLanguage(this, lang);
			},
			settings () {
				this.openSettings();
				setTimeout(() => {
					this.step += 1;
				}, 300);
			},
			...mapMutations(['openSettings'])
		}
	};
</script>

<style scoped>

</style>
