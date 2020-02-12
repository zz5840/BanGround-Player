const axios = require('axios');

module.exports = async (req, res) => {
	const { id } = req.query;
	try {
		let { data } = await axios.get('https://bestdori.com/api/songs/all.player.json');
		if (!data[id]) {
			throw new Error();
		}
		let bgm = data[id].bgmId;
		res.json({
			result: true,
			data: `https://bestdori.com/assets/jp/sound/${bgm}_rip/${bgm}.mp3`
		});
	} catch (e) {
		res.json({ result: false });
	}
};
