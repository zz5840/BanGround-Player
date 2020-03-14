const axios = require('axios');

module.exports = async (req, res) => {
	try {
		let { data } = await axios('https://gist.githubusercontent.com/zz5840/b0821d70f51b93bb7bf7f5db5267f130/raw');
		res.json(data);
	} catch (e) {
		res.json({ result: false, error: e });
	}
};
