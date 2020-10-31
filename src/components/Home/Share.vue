<template>
	<div>
		<p>{{ $t('home.share.desc') }}</p>
		<q-field :label="$t('home.play.local.type')" borderless class="q-mb-none" stack-label>
			<template v-slot:control>
				<q-option-group
					:options="[{label: 'bangbangboom', value: 'bbb'}, {label: 'Bestdori', value: 'bd'}]"
					:value="form.local.type"
					@input="updatePlayDataLocalType"
					color="primary"
					inline/>
			</template>
		</q-field>
		<q-file :label="$t('home.play.local.mapFile')"
				:value="form.local.mapFile"
				@input="updatePlayDataLocalMapFile"
				accept=".txt"
				v-if="form.local.type === 'bbb'"/>
		<q-input :label="$t('home.play.local.mapSource')"
					:value="form.local.mapSource"
					@input="updatePlayDataLocalMapSource"
					class="q-mt-md"
					outlined
					rows="5"
					type="textarea"
					v-if="form.local.type === 'bd'"/>
		<q-file :label="$t('home.play.local.musicFile')"
				:value="form.local.music"
				@input="updatePlayDataLocalMusic"
				accept=".mp3"
				class="q-mt-md"/>
		<q-input :label="$t('home.play.local.songName.title')"
					:value="form.local.songName"
					@input="updatePlayDataLocalSongName"
					class="q-mt-md"/>
	</div>
</template>

<script>
	export default {
		name: 'Share',
		data: () => ({
		}),
		watch: {
		},
		methods: {
		}
	};
</script>

<style scoped>
</style>
