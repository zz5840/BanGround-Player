export function accurateFloat (num, precision = 15) {
	return parseFloat(num.toPrecision(precision));
}

export function changeLanguage ($, lang) {
	$.$i18n.locale = lang;
}

let languages = [
	{
		label: 'English',
		name: 'en-us'
	},
	{
		label: '简体中文',
		name: 'zh-cn'
	},
	{
		label: '日本語',
		name: 'ja-jp'
	}
];

export { languages };
