import { i18n } from 'src/boot/i18n';

export default function () {
	return {
		showSettings: false,
		GameLoadConfig: null,
		tab: 'play',
		favList: [],
		historyList: [],
		playData: {
			from: 'bestdori',
			loadInfo: false,
			bestdori: {
				id: 128,
				mapType: 'official',
				difficulty: 'expert'
			},
			local: {
				type: 'bbb',
				mapFile: null,
				mapSource: '',
				music: null,
				songName: i18n.t('home.play.local.songName.default')
			}
		}
	};
}
