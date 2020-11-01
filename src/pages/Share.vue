<template>
	<q-page class="q-pt-md">
		<q-banner class="bg-green-6 text-white q-mb-md" inline-actions>
			<template v-slot:avatar>
				<q-icon name="mdi-information" color="white" />
			</template>
			{{ $t('share.desc') }}
			<template v-slot:action>
				<q-btn flat color="white" :label="$t('public.ui.dismiss')" @click="$store.commit('dismissBanner')" />
			</template>
		</q-banner>
		<q-field :label="$t('play.local.type')" borderless class="q-mb-none" stack-label>
			<template v-slot:control>
				<q-option-group
					:options="[
					    { label: 'bangbangboom v2', value: 'bbb2' },
						{ label: 'Bestdori', value: 'bd' }
					]"
					v-model="form.type"
					color="primary"
					inline/>
			</template>
		</q-field>
	</q-page>
</template>

<script>
	export default {
		name: 'PageShare',
		data () {
			return {
				form: {
					type: 'bbb2'
				}
			};
		}
	};
</script>
