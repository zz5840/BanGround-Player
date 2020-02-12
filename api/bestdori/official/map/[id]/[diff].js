const axios = require('axios');

module.exports = async (req, res) => {
	const { id, diff } = req.query;
	try {
		let { data } = await axios.get(`https://bestdori.com/api/songs/chart/${id}.${diff}.json`);
		res.json({
			result: true,
			data
		});
	} catch (e) {
		res.json({ result: false });
	}
};
