<template>
	<q-markup-table flat style="bg-transparent">
		<tbody v-if="$q.screen.sm" class="text-center">
			<tr>
				<th>Perfect</th>
				<th>Great</th>
				<th>Good</th>
				<th>Bad</th>
				<th>Miss</th>
				<th>Max Combo</th>
				<th>{{ $t('records.score') }}</th>
			</tr>
			<tr>
				<td>{{ data.perfect }}</td>
				<td>{{ data.great }}</td>
				<td>{{ data.good }}</td>
				<td>{{ data.bad }}</td>
				<td>{{ data.miss }}</td>
				<td>{{ data.maxCombo }}</td>
				<td>{{ data.score }}</td>
			</tr>
			<tr>
				<td colspan="7" class="text-bold text-center">
					{{ recordTypeText[data.type] }}
				</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr>
				<td class="text-bold">Perfect</td>
				<td>{{ data.perfect }}</td>
			</tr>
			<tr>
				<td class="text-bold">Great</td>
				<td>{{ data.great }}</td>
			</tr>
			<tr>
				<td class="text-bold">Good</td>
				<td>{{ data.good }}</td>
			</tr>
			<tr>
				<td class="text-bold">Bad</td>
				<td>{{ data.bad }}</td>
			</tr>
			<tr>
				<td class="text-bold">Miss</td>
				<td>{{ data.miss }}</td>
			</tr>
			<tr>
				<td class="text-bold">Max Combo</td>
				<td>{{ data.maxCombo }}</td>
			</tr>
			<tr>
				<td class="text-bold">{{ $t('records.score') }}</td>
				<td>{{ data.score }}</td>
			</tr>
			<tr>
				<td class="text-bold text-center" colspan="2">
					{{ recordTypeText[data.type] }}
				</td>
			</tr>
		</tbody>
	</q-markup-table>
</template>

<script>
	import { recordTypeText } from 'src/lib/Utils';

	export default {
		name: 'RecordItem',
		props: ['data'],
		data() {
			return {
				recordTypeText
			};
		}
	};
</script>
