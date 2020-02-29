<template>
	<div>
		<q-dialog persistent v-if="step === 1" v-model="guide">
			<q-card>
				<q-card-section>
					<div class="text-h6">{{ $t('public.guide.title') }}</div>
				</q-card-section>
				<q-card-section class="q-pt-none">
					{{ $t('public.guide.selectLanguage') }}
				</q-card-section>
				<q-card-actions align="left" class="float-left">
					<q-select :label="$t('public.language')"
					          :options="languageList"
					          @input="val => changeLanguage(val)"
					          class="q-pl-sm"
					          dense
					          emit-value
					          map-options
					          style="width: 120px"
					          v-model="lang"/>
				</q-card-actions>
				<q-card-actions align="right">
					<q-btn :label="$t('public.guide.next')"
					       @click="step += 1"
					       color="primary"
					       flat/>
				</q-card-actions>
			</q-card>
		</q-dialog>
		<q-dialog persistent v-if="step === 2" v-model="guide">
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
		<q-dialog persistent v-if="step === 3" v-model="guide">
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
			lang: 'en',
			guide: true,
			languageList: languages,
			step: 1
		}),
		methods: {
			changeLanguage (lang) {
				console.log(lang);
				changeLanguage(this, lang);
			},
			settings () {
				this.openSettings();
				setTimeout(() => {
					this.step += 1;
				}, 300);
			},
			...mapMutations(['openSettings'])
		},
		mounted () {
			this.changeLanguage('en');
		}
	};
</script>

<style scoped>

</style>
