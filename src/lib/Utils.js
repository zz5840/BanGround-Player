import { LocalStorage } from 'quasar';
import screenfull from 'screenfull';

export function accurateFloat (num, precision = 15) {
	return parseFloat(num.toPrecision(precision));
}

export function changeLanguage ($, lang) {
	$.$i18n.locale = lang;
	LocalStorage.set('lang', lang);
}

export function fullscreen ($this) {
	if (screenfull.isEnabled) {
		screenfull.request().then(() => {
			$this.$q.notify({
				message: $this.$t('public.fullscreen.succeeded')
			});
		}).catch(() => {
			$this.$q.notify({
				message: $this.$t('public.fullscreen.failed')
			});
		});
	} else {
		$this.$q.notify({
			message: $this.$t('public.fullscreen.unsupported')
		});
	}
}

/**
 * @param {FileList} file
 * @param {string} type text/dataurl/arraybuffer
 */
export function readFile (file, type = 'text') {
	return new Promise(resolve => {
		const reader = new FileReader();
		reader.onload = e => {
			resolve(e.target.result);
		};
		switch (type) {
			case 'text':
				reader.readAsText(file);
				break;
			case 'dataurl':
				reader.readAsDataURL(file);
				break;
			case 'arraybuffer':
				reader.readAsArrayBuffer(file);
				break;
			default:
				break;
		}
	});
}

let languages = [
	{
		label: 'English',
		value: 'en'
	},
	{
		label: '简体中文',
		value: 'zh'
	},
	{
		label: '繁體中文',
		value: 'zht'
	},
	{
		label: '日本語',
		value: 'ja'
	},
	{
		label: '한국어',
		value: 'ko'
	}
];

let difficultyText = {
	0: 'Easy',
	1: 'Normal',
	2: 'Hard',
	3: 'Expert',
	4: 'Special'
};

export { languages, difficultyText };
