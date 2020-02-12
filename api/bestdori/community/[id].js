const axios = require('axios');

module.exports = async (req, res) => {
	const { id } = req.query;
	try {
		let { data } = await axios(`https://bestdori.com/api/post/details?id=${id}`);
		if (!data.result || data.post.categoryId !== 'chart') {
			throw new Error();
		}
		let { post } = data;
		res.json({
			result: true,
			data: {
				name: post.title,
				music: post.song,
				artists: post.artists,
				difficulty: post.diff,
				level: post.level,
				author: {
					username: post.author.username,
					nickname: post.author.nickname
				},
				notes: post.notes
			}
		});
	} catch (e) {
		res.json({ result: false });
	}
};
