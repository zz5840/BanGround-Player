<template>
	<div>
		<!-- 谱面来源 -->
		<q-field :label="$t('home.play.mapSource')" borderless stack-label>
			<template v-slot:control>
				<q-option-group
					:options="[{label: $t('home.play.bestdori.title'), value: 'bestdori'}, {label: $t('home.play.local.title'), value: 'local'}]"
					color="primary"
					inline
					v-model="form.from"/>
			</template>
		</q-field>
		<!-- Bestdori -->
		<template v-if="form.from === 'bestdori'">
			<q-field :label="$t('home.play.bestdori.type.title')" borderless stack-label>
				<template v-slot:control>
					<q-option-group
						:options="[{label: $t('home.play.bestdori.type.official'), value: 'official'}, {label: $t('home.play.bestdori.type.community'), value: 'community'}]"
						color="primary"
						inline
						v-model="form.bestdori.mapType"/>
				</template>
			</q-field>
			<q-input :label="$t('home.play.bestdori.' + (form.bestdori.mapType === 'official' ? 'songId' : 'mapId'))"
			         @keypress.enter="$refs.loadBtn.click()"
			         type="number"
			         v-model="form.bestdori.id"/>
			<q-markup-table class="q-mt-md bg-transparent"
			                flat
			                separator="horizontal"
			                v-if="showInfo && form.bestdori.mapType === 'community'">
				<tbody>
				<tr>
					<td class="text-bold">
						{{ $t('home.play.bestdori.info.name') }}
					</td>
					<td>{{ info.name }}</td>
				</tr>
				<tr>
					<td class="text-bold">
						{{ $t('home.play.bestdori.info.singer') }}
					</td>
					<td>{{ info.artists }}</td>
				</tr>
				<tr>
					<td class="text-bold">
						{{ $t('home.play.bestdori.info.difficulty') }}
					</td>
					<td>{{ difficultyText[info.difficulty] }}</td>
				</tr>
				<tr>
					<td class="text-bold">
						{{ $t('home.play.bestdori.info.level') }}
					</td>
					<td>{{ info.level }}</td>
				</tr>
				<tr>
					<td class="text-bold">
						{{ $t('home.play.bestdori.info.notes') }}
					</td>
					<td>
						{{ info.notes.length }}
					</td>
				</tr>
				<tr>
					<td class="text-bold">
						{{ $t('home.play.bestdori.info.author') }}
					</td>
					<td>
						<a :href="'https://bestdori.com/community/user/' + info.author.username" class="link">{{
							info.author.nickname || info.author.username }}</a>
					</td>
				</tr>
				</tbody>
			</q-markup-table>
			<template v-if="showInfo && form.bestdori.mapType === 'official'">
				<q-markup-table class="q-mt-md bg-transparent"
				                flat
				                separator="horizontal">
					<tbody>
					<tr>
						<td class="text-bold">
							{{ $t('home.play.bestdori.info.name') }}
						</td>
						<td :colspan="colspan">{{ info.name }}</td>
					</tr>
					<tr>
						<td class="text-bold">
							{{ $t('home.play.bestdori.info.band') }}
						</td>
						<td :colspan="colspan">{{ info.band }}</td>
					</tr>
					<tr>
						<td class="text-bold">
							{{ $t('home.play.bestdori.info.difficulty') }}
						</td>
						<td :key="key" v-for="(diff, key) in info.difficulty">
							{{ difficultyText[key] }}
						</td>
					</tr>
					<tr>
						<td class="text-bold">
							{{ $t('home.play.bestdori.info.level') }}
						</td>
						<td :key="key" v-for="(diff, key) in info.difficulty">
							{{ diff.level }}
						</td>
					</tr>
					<tr>
						<td class="text-bold">
							{{ $t('home.play.bestdori.info.notes') }}
						</td>
						<td :key="key" v-for="(diff, key) in info.difficulty">
							{{ diff.notes }}
						</td>
					</tr>
					</tbody>
				</q-markup-table>
				<q-btn-toggle
					:options="difficulty"
					class="q-mt-md difficulty-select"
					spread
					text-color="primary"
					toggle-color="primary"
					unelevated
					v-model="form.bestdori.difficulty"/>
			</template>
		</template>
		<!-- 本地 -->
		<template v-if="form.from === 'local'">
			<q-field :label="$t('home.play.local.type.title')" borderless class="q-mb-none" stack-label>
				<template v-slot:control>
					<q-option-group
						:options="[{label: $t('home.play.local.type.bbb'), value: 'bbb'}, {label: $t('home.play.local.type.bd'), value: 'bd'}]"
						color="primary"
						inline
						v-model="form.local.type"/>
				</template>
			</q-field>
			<q-file :label="$t('home.play.local.mapFile')"
			        accept=".txt"
			        v-if="form.local.type === 'bbb'"
			        v-model="form.local.mapFile"/>
			<q-input :label="$t('home.play.local.mapSource')"
			         class="q-mt-md"
			         outlined
			         rows="5"
			         type="textarea"
			         v-if="form.local.type === 'bd'"
			         v-model="form.local.mapSource"/>
			<q-file :label="$t('home.play.local.musicFile')"
			        accept=".mp3"
			        class="q-mt-md"
			        v-model="form.local.music"/>
			<q-input :label="$t('home.play.local.songName.title')"
			         class="q-mt-md"
			         v-model="form.local.songName"/>
		</template>
		<!-- 加载按钮 -->
		<q-btn :disable="loading"
		       :label="isStart ? $t('home.play.start') : $t('home.play.load')"
		       :loading="loading"
		       @click="isStart ? start() : load()"
		       class="full-width q-mt-md"
		       color="primary"
		       ref="loadBtn"
		       unelevated>
			<template v-slot:loading>
				<q-spinner-facebook/>
			</template>
		</q-btn>
	</div>
</template>

<script>
	import _ from 'lodash';
	import { mapMutations } from 'vuex';
	import { difficultyText, readFile } from 'src/lib/Utils';
	import bestdori2bbb from 'src/lib/bestdori2bbb';

	export default {
		name: 'Play',
		data: function () {
			return {
				showInfo: false,
				loading: false,
				difficultyText,
				form: {
					from: 'bestdori',
					bestdori: {
						id: 128,
						mapType: 'official',
						difficulty: 'easy'
					},
					local: {
						type: 'bbb',
						mapFile: null,
						mapSource: '',
						music: null,
						songName: this.$t('home.play.local.songName.default')
					}
				},
				info: null
			};
		},
		methods: {
			...mapMutations(['openSettings']),
			async start () {
				let settings = this.$q.localStorage.getItem('settings');
				if (!settings) {
					this.openSettings();
					return;
				}
				let GameLoadConfig = {
					mapSrc: '',
					musicSrc: '',
					backgroundSrc: 'statics/skin/bg.jpg',
					skin: 'statics/skin',
					songName: ''
				};
				try {
					let map = '';
					if (this.form.from === 'bestdori') {
						this.loading = true;
						// Bestdori谱面
						if (this.form.bestdori.mapType === 'official') {
							// 官谱：1.获取谱面 2.获取音乐
							// 谱面
							let { data } = await this.$a.get(`/api/bestdori/official/map/${this.form.bestdori.id}/${this.form.bestdori.difficulty}`);
							if (!data.result) throw new Error();
							map = bestdori2bbb(data.data);
							// 音乐
							GameLoadConfig.musicSrc = await this.getOfficialMusic(this.form.bestdori.id);
							GameLoadConfig.songName = this.info.name;
						} else {
							// 社区谱：1.获取音乐
							map = bestdori2bbb(this.info.notes);
							// 音乐
							switch (this.info.music.type) {
								case 'custom':
									GameLoadConfig.musicSrc = this.info.music.audio;
									break;
								case 'bandori':
									GameLoadConfig.musicSrc = await this.getOfficialMusic(this.info.music.id);
									break;
								case 'llsif':
									GameLoadConfig.musicSrc =
										`https://card.llsif.moe/asset/assets/sound/music/m_${this.info.music.id.toString().padStart(3, '0')}.mp3`;
									break;
								case 'osu':
									GameLoadConfig.musicSrc =
										`https://beatconnect.io/audio/${this.info.msuic.id}/${this.info.music.diff}/`;
									break;
								default:
									break;
							}
							GameLoadConfig.songName = this.info.name + ' - ' + this.info.artists;
						}
					} else {
						// 本地谱面
						if (this.form.local.type === 'bbb') {
							// bangbangboom
							map = await readFile(this.form.local.mapFile);
						} else {
							// bestdori
							map = bestdori2bbb(JSON.parse(this.form.local.mapSource));
						}
						GameLoadConfig.musicSrc = await readFile(this.config.local.music, 'dataurl');
						GameLoadConfig.songName = this.form.local.songName;
					}
					GameLoadConfig.mapSrc = URL.createObjectURL(new Blob([map]));
					// TODO 开始游戏
					console.log(map);
					this.$store.commit('setGameLoadConfig', GameLoadConfig);
					this.$router.push('/play');
				} catch (e) {
					console.log(e);
					this.$q.notify({
						message: this.$t('home.play.loadFailed')
					});
				} finally {
					this.loading = false;
				}
			},
			async load () {
				this.loading = true;
				let id = this.form.bestdori.id;
				let lang = this.$i18n.locale;
				let url = this.form.bestdori.mapType === 'official'
					? `/api/bestdori/official/info/${id}/${lang}` : `/api/bestdori/community/${id}`;
				try {
					let { data } = await this.$a.get(url);
					if (data.result) {
						this.info = data.data;
						this.showInfo = true;
					} else {
						throw new Error();
					}
				} catch {
					this.$q.notify({
						message: this.$t('home.play.loadFailed')
					});
				} finally {
					this.loading = false;
				}
			},
			async getOfficialMusic (id) {
				let { data } = await this.$a.get(`/api/bestdori/official/music/${id}`);
				if (!data.result) throw new Error();
				return data.data;
			}
		},
		watch: {
			'form.bestdori.id': function () {
				this.showInfo = false;
			},
			'form.bestdori.mapType': function () {
				this.showInfo = false;
			}
		},
		computed: {
			// 判断开始按钮还是加载按钮
			isStart () {
				return this.form.from === 'local' || (this.form.from === 'bestdori' && this.showInfo);
			},
			colspan () {
				return _.keys(this.info.difficulty).length;
			},
			difficulty () {
				return _.map(this.info.difficulty, (v, k) => {
					let text = difficultyText[k];
					return { label: text, value: text.toLowerCase() };
				});
			}
		},
		beforeMount () {
			// TODO difficulty
			let { type, id } = this.$route.query;
			id = parseInt(id);
			if (type !== 'community' && type !== 'official') return;
			if (isNaN(id)) return;
			this.form.bestdori.mapType = type;
			this.form.bestdori.id = id;
		},
		mounted () {
			let { autoload } = this.$route.query;
			autoload = autoload === 'true';
			if (autoload) this.$refs.loadBtn.click();
		}
	};
</script>

<style lang="stylus">
	.difficulty-select
		border 1px solid $primary
		height 36px
</style>
