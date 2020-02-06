<template>
	<div>
		<q-select :label="$t('home.convert.from')"
		          :options="options"
		          behavior="menu"
		          v-model="from"/>
		<q-select :label="$t('home.convert.to')"
		          :options="options"
		          behavior="menu"
		          class="q-py-sm"
		          v-model="to"/>
		<q-file :accept="from.value === 'bbb' ? '.txt' : '.json'"
		       :label="$t('home.convert.fileInput')"
		       v-if="isFile(from.value)"
		       v-model="fromFile"/>
		<q-input
			:label="$t('home.play.local.mapSource')"
			class="q-py-sm"
			outlined
			rows="5"
			type="textarea"
			v-if="!isFile(from.value)"
			v-model="fromText"/>
		<q-field :label="$t('home.convert.convertResult')"
		         @focus="selectText"
		         class="q-py-sm"
		         outlined
		         stack-label
		         v-if="!isFile(to.value)">
			<template v-slot:control>
				<textarea class="readonly-textarea"
				          readonly
				          ref="result"
				          rows="5"
				          v-model="convertResult"/>
			</template>
		</q-field>
		<p class="q-my-none text-negative" v-if="from.value === to.value">{{ $t('home.convert.serious') }}</p>
		<q-btn :label="$t('home.convert.download')"
		       class="full-width q-mt-sm"
		       color="primary"
		       v-if="isFile(to.value)"/>
	</div>
</template>

<script>
	export default {
		name: 'Convert',
		data: function () {
			return {
				options: [
					{
						label: 'bangbangboom',
						value: 'bbb'
					},
					{
						label: 'Bestdori',
						value: 'bd'
					},
					{
						label: 'BanGround',
						value: 'bg'
					}
				],
				from: {
					label: 'bangbangboom',
					value: 'bbb'
				},
				to: {
					label: 'Bestdori',
					value: 'bd'
				},
				fromFile: null,
				fromText: '',
				toData: '',
				convertResult: this.$t('home.convert.noInput')
			};
		},
		methods: {
			isFile (type) {
				return ['bbb', 'bg'].includes(type);
			},
			selectText () {
				this.$refs.result.select();
			}
		}
	};
</script>

<style scoped>
	.readonly-textarea {
		appearance: none;
		outline: none;
		background-color: transparent;
		border: none;
		width: 100%;
		resize: none;
	}
</style>
