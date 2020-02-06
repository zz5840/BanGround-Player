<template>
	<q-field :label="label"
	         :value="text"
	         @clear="clear"
	         @click.native="$refs.filePicker.click()"
	         bottom-slots
	         class="q-pt-none q-pb-sm"
	         clear-icon="mdi-close"
	         clearable>
		<template v-slot:before>
			<q-icon name="mdi-paperclip"/>
		</template>

		<template v-slot:control>
			<input :accept="accept"
			       @change="pickFile"
			       ref="filePicker"
			       style="display:none"
			       type="file">
			<div class="self-center full-width no-outline" tabindex="0">{{ text }}</div>
		</template>
	</q-field>
</template>
<script>
	export default {
		name: 'FileInput',
		model: {
			prop: 'file',
			event: 'change'
		},
		props: {
			label: String,
			file: File,
			accept: String
		},
		methods: {
			pickFile (evt) {
				let files = evt.target.files;
				if (files.length > 0) {
					this.$emit('change', files[0]);
				}
			},
			clear () {
				this.$emit('change', null);
			}
		},
		computed: {
			text () {
				return this.file ? this.file.name : '';
			}
		}
	};
</script>
