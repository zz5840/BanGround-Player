<template>
	<div>
		<q-field :label="$t('home.play.mapSource')" borderless stack-label>
			<template v-slot:control>
				<q-option-group
					:options="[{label: $t('home.play.bestdori.title'), value: 'bestdori'}, {label: $t('home.play.local.title'), value: 'local'}]"
					color="primary"
					inline
					v-model="form.from"
				/>
			</template>
		</q-field>
		<template v-if="form.from === 'bestdori'">
			<q-input :label="$t('home.play.bestdori.mapId')" type="number" v-model="form.bestdori.mapId"/>
		</template>
		<template v-if="form.from === 'local'">
			<q-field :label="$t('home.play.local.type.title')" borderless stack-label>
				<template v-slot:control>
					<q-option-group
						:options="[{label: $t('home.play.local.type.bbb'), value: 'bbb'}, {label: $t('home.play.local.type.bd'), value: 'bd'}]"
						color="primary"
						inline
						v-model="form.local.type"
					/>
				</template>
			</q-field>
			<q-file :label="$t('home.play.local.mapFile')"
			        accept=".txt"
			        v-if="form.local.type === 'bbb'"
			        v-model="form.local.mapFile"/>
			<q-input
				:label="$t('home.play.local.mapSource')"
				outlined
				rows="5"
				type="textarea"
				v-if="form.local.type === 'bd'"
				v-model="form.local.mapSource"/>
			<q-file :label="$t('home.play.local.musicFile')"
			        accept=".mp3"
			        v-model="form.local.music"/>
			<q-input :label="$t('home.play.local.songName.title')"
			         v-model="form.local.songName"/>
		</template>
		<q-btn :label="isStart ? $t('home.play.start') : $t('home.play.load')" class="full-width q-mt-md"
		       color="primary"/>
	</div>
</template>

<script>
	export default {
		name: 'Play',
		data: function () {
			return {
				showInfo: false,
				form: {
					from: 'bestdori',
					bestdori: {
						mapId: 2940
					},
					local: {
						type: 'bbb',
						mapFile: null,
						mapSource: '',
						music: null,
						songName: this.$t('home.play.local.songName.default')
					}
				}
			};
		},
		computed: {
			// 判断开始按钮还是加载按钮
			isStart () {
				return (
					this.form.from === 'local' || (this.form.from === 'bestdori' && this.showInfo)
				);
			}
		}
	};
</script>
