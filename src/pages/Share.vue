<template>
	<q-page class="q-pt-md q-pb-lg">
		<q-banner class="bg-green-6 text-white q-mb-md" inline-actions v-if="false">
			<template v-slot:avatar>
				<q-icon name="mdi-information" color="white" />
			</template>
			{{ $t('share.desc') }}
			<template v-slot:action>
				<q-btn
					flat
					color="white"
					:label="$t('public.ui.dismiss')"
					@click="$store.commit('dismissBanner')"
				/>
			</template>
		</q-banner>
		<q-field
			:label="$t('play.local.type')"
			borderless
			class="q-mb-none"
			stack-label
		>
			<template v-slot:control>
				<q-option-group
					:options="[
						{ label: 'bangbangboom v2', value: 'bbb2' },
						{ label: 'Bestdori', value: 'bd' }
					]"
					v-model="form.type"
					color="primary"
					inline
				/>
			</template>
		</q-field>
		<q-file
			:label="$t('play.local.mapFile')"
			v-model="form.mapFile"
			accept=".txt"
			v-if="form.type === 'bbb2'"
		/>
		<q-input
			:label="$t('play.local.mapSource')"
			v-model="form.mapSourceCode"
			class="q-mt-md"
			outlined
			rows="5"
			type="textarea"
			v-if="form.type === 'bd'"
		/>
		<q-file
			:label="$t('play.local.musicFile')"
			v-model="form.music"
			accept=".mp3"
			class="q-mt-md"
		/>
		<q-input
			:label="$t('play.bestdori.info.name')"
			v-model="form.songName"
			class="q-mt-md"
		/>
		<q-input
			:label="$t('play.bestdori.info.singer')"
			v-model="form.artists"
			class="q-mt-md"
		/>
		<q-field
			:label="$t('play.bestdori.info.level')"
			borderless
			class="q-mt-md"
			stack-label
		>
			<template v-slot:control>
				<q-btn-toggle
					:options="difficultyOptions"
					v-model="form.difficulty"
					class="q-mt-sm full-width select-switch-btn"
					spread
					text-color="primary"
					toggle-color="primary"
					unelevated
				/>
			</template>
		</q-field>
		<q-select
			v-model="form.level"
			:options="levelOptions"
			:label="$t('play.bestdori.info.level')"
			class="q-mt-md"
		/>
		<q-btn
			:label="$t('share.title')"
			class="q-mt-md full-width"
			color="primary"
		/>
	</q-page>
</template>

<script>
	import { difficultyText } from 'src/lib/Utils';

	export default {
		name: 'PageShare',
		data() {
			return {
				levelOptions: new Array(26).fill(0).map((v, i) => i + 5),
				difficultyOptions: Object.values(difficultyText).map((v, i) => {
					return {
						label: v,
						value: i
					};
				}),
				form: {
					type: null,
					mapFile: null,
					mapSourceCode: null,
					music: null,
					songName: null,
					author: null,
					difficulty: null,
					level: null,
					artists: null
				}
			};
		}
	};
</script>
