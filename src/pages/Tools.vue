<template>
	<q-page class="q-pt-md q-pb-lg">
		<q-tabs
			active-color="primary"
			align="justify"
			class="text-grey-7"
			indicator-color="primary"
		>
			<q-route-tab icon="mdi-file-swap" to="convert" :label="$t('tools.convert.title')" exact />
			<q-route-tab icon="mdi-keyboard-space" to="calculate" :label="$t('tools.calc.title')" exact />
		</q-tabs>
		<router-view class="q-mt-md" />
	</q-page>
</template>

<script>
	export default {
		name: 'PageTools'
	};
</script>
