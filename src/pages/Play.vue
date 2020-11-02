<template>
	<q-page class="q-pt-md q-pb-lg">
		<q-banner class="bg-red-6 text-white q-mb-md" inline-actions>
			<template v-slot:avatar>
				<q-icon name="mdi-information" color="white" />
			</template>
			You are visiting BanGround Player v2 and it's still under early development now. And the current version is only for translation, so if you find bugs in the site, please DON'T report to me and wait for a stable release version.
		</q-banner>
		<!-- 谱面来源 -->
		<q-field :label="$t('play.mapSource')" borderless stack-label>
			<template v-slot:control>
				<q-option-group
					:options="[
						{ label: 'Bestdori', value: 'bestdori' },
						{ label: $t('play.local.title'), value: 'local' }
					]"
					:value="form.from"
					@input="updatePlayDataFrom"
					color="primary"
					inline
				/>
			</template>
		</q-field>
		<!-- Bestdori -->
		<template v-if="form.from === 'bestdori'">
			<q-field
				:label="$t('play.bestdori.type.title')"
				borderless
				stack-label
			>
				<template v-slot:control>
					<q-option-group
						:options="[
							{
								label: $t('play.bestdori.type.official'),
								value: 'official'
							},
							{
								label: $t('play.bestdori.type.community'),
								value: 'community'
							}
						]"
						:value="form.bestdori.mapType"
						@input="updatePlayDataBestdoriMapType"
						color="primary"
						inline
					/>
				</template>
			</q-field>
			<q-input
				:label="
					$t(
						'play.bestdori.' +
							(form.bestdori.mapType === 'official'
								? 'songId'
								: 'mapId')
					)
				"
				:value="form.bestdori.id"
				@input="updatePlayDataBestdoriId"
				@keypress.enter="$refs.loadBtn.click()"
				type="number"
			/>
			<p class="q-mt-md" v-if="showInfo">
				{{ $t("play.bestdori.info.shareLink")
				}}<a :href="playLink" class="link" target="_blank">{{
					playLink
				}}</a>
			</p>
			<q-markup-table
				class=" bg-transparent"
				flat
				separator="horizontal"
				v-if="showInfo && form.bestdori.mapType === 'community'"
			>
				<tbody>
					<tr>
						<td class="text-bold">
							{{ $t("play.bestdori.info.name") }}
						</td>
						<td>{{ info.name }}</td>
					</tr>
					<tr>
						<td class="text-bold">
							{{ $t("play.bestdori.info.singer") }}
						</td>
						<td>{{ info.artists }}</td>
					</tr>
					<tr>
						<td class="text-bold">
							{{ $t("play.bestdori.info.difficulty") }}
						</td>
						<td>{{ difficultyText[info.difficulty] }}</td>
					</tr>
					<tr>
						<td class="text-bold">
							{{ $t("play.bestdori.info.level") }}
						</td>
						<td>{{ info.level }}</td>
					</tr>
					<tr>
						<td class="text-bold">
							{{ $t("play.bestdori.info.notes") }}
						</td>
						<td>
							{{ info.notes.length }}
						</td>
					</tr>
					<tr>
						<td class="text-bold">
							{{ $t("play.bestdori.info.author") }}
						</td>
						<td>
							<a
								:href="
									'https://bestdori.com/community/user/' +
										info.author.username
								"
								class="link"
								>{{
									info.author.nickname || info.author.username
								}}</a
							>
						</td>
					</tr>
				</tbody>
			</q-markup-table>
			<template v-if="showInfo && form.bestdori.mapType === 'official'">
				<q-markup-table
					class="q-mt-md bg-transparent"
					flat
					separator="horizontal"
				>
					<tbody>
						<tr>
							<td class="text-bold">
								{{ $t("play.bestdori.info.name") }}
							</td>
							<td :colspan="colspan">{{ info.name }}</td>
						</tr>
						<tr>
							<td class="text-bold">
								{{ $t("play.bestdori.info.band") }}
							</td>
							<td :colspan="colspan">{{ info.band }}</td>
						</tr>
						<tr>
							<td class="text-bold">
								{{ $t("play.bestdori.info.difficulty") }}
							</td>
							<td
								:key="key"
								v-for="(diff, key) in info.difficulty"
							>
								{{ difficultyText[key] }}
							</td>
						</tr>
						<tr>
							<td class="text-bold">
								{{ $t("play.bestdori.info.level") }}
							</td>
							<td
								:key="key"
								v-for="(diff, key) in info.difficulty"
							>
								{{ diff.level }}
							</td>
						</tr>
						<tr>
							<td class="text-bold">
								{{ $t("play.bestdori.info.notes") }}
							</td>
							<td
								:key="key"
								v-for="(diff, key) in info.difficulty"
							>
								{{ diff.notes }}
							</td>
						</tr>
					</tbody>
				</q-markup-table>
				<q-btn-toggle
					:options="difficulty"
					:value="form.bestdori.difficulty"
					@input="updatePlayDataBestdoriDifficulty"
					class="q-mt-md select-switch-btn"
					spread
					text-color="primary"
					toggle-color="primary"
					unelevated
				/>
			</template>
		</template>
		<!-- 本地 -->
		<template v-if="form.from === 'local'">
			<q-field
				:label="$t('play.local.type')"
				borderless
				class="q-mb-none"
				stack-label
			>
				<template v-slot:control>
					<q-option-group
						:options="[
							{ label: 'bangbangboom', value: 'bbb' },
							{ label: 'Bestdori', value: 'bd' }
						]"
						:value="form.local.type"
						@input="updatePlayDataLocalType"
						color="primary"
						inline
					/>
				</template>
			</q-field>
			<q-file
				:label="$t('play.local.mapFile')"
				:value="form.local.mapFile"
				@input="updatePlayDataLocalMapFile"
				accept=".txt"
				v-if="form.local.type === 'bbb'"
			/>
			<q-input
				:label="$t('play.local.mapSource')"
				:value="form.local.mapSource"
				@input="updatePlayDataLocalMapSource"
				class="q-mt-md"
				outlined
				rows="5"
				type="textarea"
				v-if="form.local.type === 'bd'"
			/>
			<q-file
				:label="$t('play.local.musicFile')"
				v-model="form.local.music"
				accept=".mp3"
				class="q-mt-md"
			/>
			<q-input
				:label="$t('play.local.songName.title')"
				v-model="form.local.songName"
				class="q-mt-md"
			/>
			<q-input
				:label="$t('play.local.songName.title')"
				v-model="form.local.songName"
				class="q-mt-md"
			/>
		</template>
		<!-- 加载按钮 -->
		<q-btn
			:disable="loading"
			:label="isStart ? $t('play.start') : $t('play.load')"
			:loading="loading"
			@click="isStart ? start() : load()"
			class="full-width q-mt-md"
			color="primary"
			ref="loadBtn"
			unelevated
		>
			<template v-slot:loading>
				<q-spinner-facebook />
			</template>
		</q-btn>
		<q-page-sticky
			:offset="[30, 30]"
			position="bottom-right"
			v-if="isStart && form.from === 'bestdori'"
		>
			<q-btn
				:icon="isFaved ? 'mdi-heart' : 'mdi-heart-outline'"
				@click="fav(isFaved ? 'del' : 'add')"
				color="orange-9"
				fab
			/>
		</q-page-sticky>
	</q-page>
</template>

<script>
	import { keys, map } from 'lodash';
	import { mapMutations, mapState } from 'vuex';
	import { difficultyText, readFile } from 'src/lib/Utils';
	import bestdori2bbb from 'src/lib/bestdori2bbb';

	export default {
		name: 'PagePlay',
		data: function () {
			return {
				showInfo: false,
				loading: false,
				difficultyText,
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
					backgroundSrc: 'skin/bg.jpg',
					skin: 'skin',
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
							try {
								map = bestdori2bbb(data.data);
							} catch (e) {
								let error = JSON.parse(e.message);
								this.$q.notify({
									message: this.$t('home.convert.error.' + error.key, error.data)
								});
							}
							// 音乐
							GameLoadConfig.musicSrc = await this.getOfficialMusic(this.form.bestdori.id);
							GameLoadConfig.songName = this.info.name + ' - ' + this.info.band;
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
						GameLoadConfig.musicSrc = await readFile(this.form.local.music, 'dataurl');
						GameLoadConfig.songName = this.form.local.songName;
					}
					GameLoadConfig.mapSrc = URL.createObjectURL(new Blob([map]));
					this.$store.commit('setGameLoadConfig', GameLoadConfig);
					this.$router.push('/play');
				} catch (e) {
					console.log(e);
					this.$q.notify({
						message: this.$t('play.loadFailed')
					});
				} finally {
					this.loading = false;
				}
			},
			async load () {
				this.loading = true;
				let id = this.form.bestdori.id;
				let lang = this.$i18n.locale;
				let url = (this.form.bestdori.mapType === 'official'
					? `/api/bestdori/official/info/${id}/${lang}` : `/api/bestdori/community/${id}`);
				try {
					let { data } = await this.$a.get(url);
					if (data.result) {
						this.info = data.data;
						this.showInfo = true;
						this.$store.commit('addHistory', {
							id: this.form.bestdori.id,
							type: this.form.bestdori.mapType,
							name: this.songName
						});
					} else {
						throw new Error();
					}
				} catch {
					this.$q.notify({
						message: this.$t('play.loadFailed')
					});
				} finally {
					this.loading = false;
				}
			},
			async getOfficialMusic (id) {
				let { data } = await this.$a.get(`/api/bestdori/official/music/${id}`);
				if (!data.result) throw new Error();
				return data.data;
			},
			fav (action) {
				this.$store.commit(action === 'add' ? 'addFav' : 'delFavById', {
					id: this.form.bestdori.id,
					type: this.form.bestdori.mapType,
					name: this.songName
				});
				this.$q.notify({
					message: this.$t(action === 'add'
						? 'public.favourite.faved'
						: 'public.favourite.deleted', { name: this.songName })
				});
			},
			updatePlayDataFrom (val) {
				this.$store.commit('updatePlayDataFrom', val);
			},
			updatePlayDataBestdoriId (val) {
				this.$store.commit('updatePlayDataBestdoriId', parseInt(val) || '');
			},
			updatePlayDataBestdoriMapType (val) {
				this.$store.commit('updatePlayDataBestdoriMapType', val);
			},
			updatePlayDataBestdoriDifficulty (val) {
				this.$store.commit('updatePlayDataBestdoriDifficulty', val);
			},
			updatePlayDataLocalType (val) {
				this.$store.commit('updatePlayDataLocalType', val);
			},
			updatePlayDataLocalMapFile (val) {
				this.$store.commit('updatePlayDataLocalMapFile', val);
			},
			updatePlayDataLocalMapSource (val) {
				this.$store.commit('updatePlayDataLocalMapSource', val);
			},
			updatePlayDataLocalMusic (val) {
				this.$store.commit('updatePlayDataLocalMusic', val);
			},
			updatePlayDataLocalSongName (val) {
				this.$store.commit('updatePlayDataLocalSongName', val);
			}
		},
		watch: {
			'form.bestdori.id': function (val) {
				this.showInfo = false;
			},
			'form.bestdori.mapType': function () {
				this.showInfo = false;
			},
			'form.loadInfo': function (val) {
				if (val && !this.isStart) {
					this.$refs.loadBtn.click();
				}
				this.$store.commit('updatePlayDataLoadInfo', false);
			}
		},
		computed: {
			...mapState({
				form: 'playData'
			}),
			songName () {
				return this.form.bestdori.mapType === 'official'
					? this.info.name + ' - ' + this.info.band
					: this.info.name + ' - ' + this.info.artists;
			},
			isFaved () {
				return this.$store.getters.isFaved(this.form.bestdori.id, this.form.bestdori.mapType);
			},
			// 判断开始按钮还是加载按钮
			isStart () {
				return this.form.from === 'local' || (this.form.from === 'bestdori' && this.showInfo);
			},
			colspan () {
				return keys(this.info.difficulty).length;
			},
			difficulty () {
				return map(this.info.difficulty, (v, k) => {
					let text = difficultyText[k];
					return { label: text, value: text.toLowerCase() };
				});
			},
			playLink () {
				return `https://player.banground.fun/?type=${this.form.bestdori.mapType}&id=${this.form.bestdori.id}&autoload=true`;
			}
		},
		mounted () {
			if (this.form.loadInfo && !this.isStart) {
				this.$refs.loadBtn.click();
				this.$store.commit('updatePlayDataLoadInfo', false);
			}
			let { type, id, autoload } = this.$route.query;
			id = parseInt(id);
			autoload = autoload === 'true';
			if (type !== 'community' && type !== 'official') return;
			if (isNaN(id)) return;
			this.form.bestdori.mapType = type;
			this.form.bestdori.id = id;
			if (autoload) this.$refs.loadBtn.click();
			this.$router.replace('/');
		}
	};
</script>
