<template>
	<q-dialog :persistent="persistent" @hide="onDialogHide" ref="dialog">
		<q-card>
			<q-card-section>
				<div class="text-h6">{{ message }}</div>
			</q-card-section>
			<q-card-section>
				<q-input :max="max"
				         :min="min"
				         :step="step"
				         @keyup.enter="onOKClick"
				         autofocus
				         dense
				         style="width: 368px"
				         type="number"
				         v-model="v"/>
			</q-card-section>
			<q-card-actions align="right">
				<q-btn :label="cancel" color="primary" flat v-close-popup/>
				<q-btn :label="ok" @click="onOKClick" color="primary" flat/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
	export default {
		name: 'NumberDialog',
		props: ['value', 'min', 'max', 'step', 'message', 'persistent', 'ok', 'cancel', 'digits'],
		data: () => ({
			v: 0
		}),
		methods: {
			show () {
				this.$refs.dialog.show();
			},
			hide () {
				this.$refs.dialog.hide();
			},
			onDialogHide () {
				this.$emit('hide');
			},
			onOKClick () {
				let val = parseFloat(parseFloat(this.v).toFixed(this.digits));
				if (isNaN(val)) {
					val = this.value;
				}
				this.$emit('ok', val);
				this.hide();
			}
		},
		beforeMount () {
			this.v = this.value;
		}
	};
</script>
<style scoped>

</style>
