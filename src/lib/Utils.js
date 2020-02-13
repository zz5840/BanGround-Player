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
		name: 'en'
	},
	{
		label: '简体中文',
		name: 'zh'
	},
	{
		label: '日本語',
		name: 'ja'
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
