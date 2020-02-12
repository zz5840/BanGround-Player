export default {
	public: {
		radioOn: 'オン',
		radioOff: 'オフ',
		cancel: 'キャンセル',
		ok: 'オーケー',
		language: '言語',
		inputValue: '値が不可欠、入力してください。',
		fullscreen: {
			title: 'フルスクリーン',
			succeeded: '画面縦向きのロックをオフにして、最高のゲーム体験を楽しむ為に携帯電話を縦に保持してください',
			failed: '全画面モードが起動出来ない、携帯の権限の許可を確認してください',
			unsupported: '今のブラウザはフルスクリーンモードをサポートしないので、他のブラウザを使ってください'
		},
		settings: {
			title: '設置',
			autoFullscreen: '自動フルスクリーン',
			speed: 'リズムアイコンの速さ',
			noteScale: 'アイコンの大きさ',
			judgeOffset: '判定偏移',
			visualOffset: '視覚偏移',
			barOpacity: '長押しラインの濃さ',
			effectVolume: 'SE音量',
			backgroundDim: '背景画像の透明性',
			showSimLine: '同時押しライン',
			beatNote: 'リズムサポート',
			mirror: 'ミラー',
			laneEffect: 'レーンエフェクト'
		},
		guide: {
			title: 'ようこそ',
			selectLanguage: '初めてサイトにおアクセスされますので。自分に必要な言語を選択してください。他はページの右上にある言語設置で変更もできます。',
			changeSettings: 'これから、ゲームの中に様々な演奏設置を適切に設定することを通して、自分の習慣に合うようになります。もし早めにゲームを楽しむなら、この節をスキップして後で設定することもできます。',
			complete: 'やりますね！ すべての初期設定が完了しました。お楽しみください！'
		}
	},
	home: {
		play: {
			title: '開始',
			mapSource: '譜面ソース',
			bestdori: {
				title: 'Bestdori',
				mapId: '譜面ID',
				info: {
					name: '曲名',
					singer: '芸術家',
					difficulty: '難易度',
					level: 'レベル',
					author: '譜面作成者',
					difficultyText: {
						0: 'Easy',
						1: 'Normal',
						2: 'Hard',
						3: 'Expert',
						4: 'Special'
					}
				}
			},
			local: {
				title: 'ローカル',
				type: {
					title: '譜面タイプ',
					bbb: 'bangbangboom',
					bd: 'Bestdori'
				},
				mapFile: '譜面ファイル',
				mapSource: '譜面のソースコード',
				mapCover: '譜面カバー',
				songName: {
					title: '曲名',
					default: 'テスト譜面'
				},
				musicFile: 'ミュージックファイル'
			},
			start: 'スタート',
			load: '譜面をロード',
			loadFailed: '譜面はロードが失敗した、もう一度お試しください'
		},
		convert: {
			title: '転換する',
			from: '元の譜面パターン',
			to: '転換しての譜面パターン',
			fileInput: '譜面ファイル',
			noInput: 'ファイルまたは譜面がない、一つを選択してください',
			convertResult: '転換の結果',
			download: 'ダウンロード',
			serious: 'この操作がファイルに無効、真面目に進行するか'
		},
		space: {
			title: '計算機能',
			bpm: '最初部分のＢＰＭ',
			offset: '最初部分の偏移量',
			result: '曲の先頭に{0}無音を追加する、或いは音楽の先頭から{1}無音を削除する'
		},
		about: {
			title: 'について'
		}
	}
};
