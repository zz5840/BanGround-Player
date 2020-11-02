<template>
	<q-page class="q-pt-md q-pb-lg">
		<h6 class="text-h6 q-mt-none q-mb-md">BanGround Player</h6>
		<p class="text-body2">
			Open Sourced on
			<a
				class="link"
				href="https://github.com/zz5840/BanGround-Player"
				target="_blank"
			>
				<q-icon name="mdi-github-circle" />
				Github</a
			>
		</p>
		<p class="text-body2">
			Version:
			<a
				:href="
					`https://github.com/zz5840/BanGround-Player/tree/${
						commit !== 'dev' ? commit : 'v2'
					}`
				"
				target="_blank"
				class="link"
			>{{ version }}@{{ commit }}</a
			>
		</p>
		<p class="text-body2">
			Developed By
			<a class="link" href="https://github.com/zz5840" target="_blank"
				>QingFu(@zz5840)</a
			>
		</p>
		<p class="text-body2">
			Map Player By
			<a
				class="link"
				href="https://github.com/K024/bangbangboom-game"
				target="_blank"
				>K024</a
			>
		</p>
		<p class="text-body2">
			You can contribute translations on
			<a
				class="link"
				href="https://crowdin.com/project/banground"
				target="_blank"
				>Crowdin</a
			>
		</p>
		<p class="text-body2">
			Special thanks to
			<a class="link" href="https://bestdori.com/" target="_blank"
				>Bestdori!</a
			>
			and all translators.
		</p>
	</q-page>
</template>

<script>
	import { COMMIT_ID, APP_VERSION } from 'src/lib/Utils';

	export default {
		name: 'PageAbout',
		data() {
			return {
				version: APP_VERSION,
				commit: COMMIT_ID
			};
		}
	};
</script>
