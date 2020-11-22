import { LocalStorage } from 'quasar';
import screenfull from 'screenfull';
import { i18n } from 'boot/i18n';

export function accurateFloat(num, precision = 15) {
	return parseFloat(num.toPrecision(precision));
}

export function changeLanguage(lang) {
	i18n.locale = lang;
	LocalStorage.set('lang', lang);
}

export async function toggleFullscreen() {
	if (screenfull.isEnabled) {
		if (!screenfull.isFullscreen) {
			return fullscreen();
		} else {
			await screenfull.exit();
		}
	} else {
		return 'unsupported';
	}
}

export async function fullscreen() {
	try {
		await screenfull.request();
		return 'succeeded';
	} catch {
		return 'failed';
	}
}

/**
 * @param {FileList} file
 * @param {string} type text/dataurl/arraybuffer
 */
export function readFile(file, type = 'text') {
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
	{ label: 'English', value: 'en' },
	{ label: 'Deutsch', value: 'de' },
	{ label: 'Français', value: 'fr' },
	{ label: '日本語', value: 'ja' },
	{ label: '한국어', value: 'ko' },
	{ label: 'Русский', value: 'ru' },
	{ label: '简体中文', value: 'zh' },
	{ label: '繁體中文', value: 'zht' }
];

let difficultyText = {
	0: 'Easy',
	1: 'Normal',
	2: 'Hard',
	3: 'Expert',
	4: 'Special'
};

let recordTypeText = {
	0: 'Cleared',
	1: 'Full Combo',
	2: 'All Perfect'
};

const COMMIT_ID = process.env.COMMIT_ID;

const APP_VERSION = process.env.APP_VERSION;

export {
	languages,
	difficultyText,
	recordTypeText,
	COMMIT_ID,
	APP_VERSION
};
