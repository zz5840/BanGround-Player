<template>
	<q-btn-group outline style="width: 100%">
		<q-btn @click="changeValue('-', bigStep)"
		       color="primary"
		       icon="mdi-chevron-left"
		       style="width: 36px;"/>
		<q-btn @click="changeValue('-', smallStep)"
		       color="primary"
		       icon="mdi-minus"
		       style="width: 36px;"/>
		<q-btn :label="label ? label : val"
		       @click="inputValue()"
		       color="primary"
		       outline
		       style="width: 100%;"/>
		<q-btn @click="changeValue('+', smallStep)"
		       color="primary"
		       icon="mdi-plus"
		       split
		       style="width: 36px;"/>
		<q-btn @click="changeValue('+', bigStep)"
		       color="primary"
		       icon="mdi-chevron-right"
		       style="width: 36px;"/>
	</q-btn-group>
</template>

<script>
	import NumberDialog from 'components/Common/NumberDialog';

	export default {
		name: 'ButtonValue',
		model: {
			prop: 'val',
			event: 'change'
		},
		props: {
			val: Number,
			digits: Number,
			smallStep: Number,
			bigStep: Number,
			max: Number,
			min: Number,
			label: String
		},
		methods: {
			changeValue (action, num) {
				let val = this.val;
				switch (action) {
					case '+':
						val += num;
						val = Math.min(val, this.max);
						break;
					case '-':
						val -= num;
						val = Math.max(val, this.min);
						break;
				}
				val = parseFloat(val.toFixed(this.digits));
				this.$emit('change', val);
			},
			inputValue () {
				this.$q.dialog({
					message: this.$t('public.inputValue'),
					min: this.min,
					max: this.max,
					step: this.smallStep,
					value: this.val,
					ok: this.$t('public.ok'),
					cancel: this.$t('public.cancel'),
					digits: this.digits,
					component: NumberDialog,
					persistent: true
				}).onOk(val => {
					this.$emit('change', val);
				});
			}
		}
	};
</script>

<style scoped>

</style>
