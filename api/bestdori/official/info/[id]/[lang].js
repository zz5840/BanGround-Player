const axios = require('axios');
const _ = require('lodash');

module.exports = async (req, res) => {
	const { id, lang } = req.query;
	const langId = ({
		ja: 0,
		en: 1,
		zh: 3
	})[lang];
	try {
		let { data } = await axios(`https://bestdori.com/api/songs/${id}.json`);
		let { data: band } = await axios('https://bestdori.com/api/bands/all.1.json');
		res.json({
			result: true,
			data: {
				name: data.musicTitle[langId] || data.musicTitle[0],
				band: band[data.bandId].bandName[langId] || band[data.bandId].bandName[0],
				difficulty: _.mapValues(data.difficulty, (v, k) => {
					return {
						level: v.playLevel,
						notes: data.notes[k]
					};
				})
			}
		});
	} catch (e) {
		res.json({ result: false });
	}
};
