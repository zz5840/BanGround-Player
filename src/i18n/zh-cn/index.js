export default {
	public: {
		radioOn: '开',
		radioOff: '关',
		cancel: '取消',
		ok: '确认',
		language: '语言',
		inputValue: '请输入数值',
		fullscreen: {
			title: '全屏',
			succeeded: '翻转屏幕获得最佳体验～',
			failed: '没能进入全屏QAQ，主人要好好检查权限哦',
			unsupported: '主人的浏览器不支持全屏哦'
		},
		settings: {
			title: '设置',
			autoFullscreen: '自动全屏',
			speed: '节奏图标的速度',
			noteScale: '节奏图标的大小',
			judgeOffset: '判定偏移',
			visualOffset: '视觉偏移',
			barOpacity: '长按按条透明度',
			effectVolume: '效果音音量',
			backgroundDim: '背景图片透明度',
			showSimLine: '同时点击线',
			beatNote: '节奏的色觉辅助',
			mirror: '镜像',
			laneEffect: '轨道特效'
		},
		guide: {
			title: '欢迎',
			selectLanguage: '主人这是第一次访问我呢，请选择你喜欢的语言，稍后可以在右上角的选择语言里自由更改的w',
			changeSettings: '第一次需要设置一下才能适合主人来游玩，主人也可以在之后的设置里随时修改呢',
			complete: '太好了主人，你已经调教好了，接下来请尽情享受吧（'
		}
	},
	home: {
		play: {
			title: '游玩谱面',
			mapSource: '谱面来源',
			bestdori: {
				title: 'Bestdori',
				mapId: 'Map ID',
				info: {
					name: '歌曲名',
					singer: '歌曲作者',
					difficulty: '难度',
					level: '等级',
					author: '谱面作者',
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
				title: '本地',
				type: {
					title: '谱面类型',
					bbb: 'bangbangboom',
					bd: 'Bestdori'
				},
				mapFile: '歌曲文件',
				mapSource: '谱面代码',
				mapCover: '封面',
				songName: {
					title: '歌曲名',
					default: '测试谱面'
				},
				musicFile: '音乐文件'
			},
			start: '开始',
			load: '载入信息',
			loadFailed: '载入失败，请重试'
		},
		convert: {
			title: '转换谱面',
			from: '源谱面格式',
			to: '输出谱面格式',
			fileInput: '谱面文件',
			noInput: '您还没有选择任何谱面呢',
			convertResult: '转换结果',
			download: '下载',
			serious: '你是沙雕吗？'
		},
		space: {
			title: '计算留白',
			bpm: '第一段BPM',
			offset: '第一段Offset（秒）',
			result: '请添加 {0} 空白到歌曲开头或从歌曲开头删除 {1} 空白'
		},
		about: {
			title: '关于'
		}
	}
};
