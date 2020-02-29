export default function bestdori2bbb (bestdori) {
	let bpms = [];
	let offsetBeat = 0;
	let notesData = [];
	let slides = {
		a: false,
		b: false
	};
	let long = {};
	bestdori.forEach(e => {
		if (e.type === 'System' && e.cmd === 'BPM') {
			if (bpms.length) bpms[bpms.length - 1].to = e.beat;
			offsetBeat = e.beat;
			let {
				bpm
			} = e;
			bpms.push({
				bpm,
				from: e.beat
			});
			let offsetTime = calculateTime(e.beat, bpms);
			notesData.push({
				bpm,
				offset: offsetTime,
				txt: `\n+|${offsetTime}|${bpm}|4\n`,
				notes: []
			});
			console.log('BPM: ' + e.bpm);
		} else if (e.type === 'Note') {
			let index = notesData.length - 1;
			let beat = Math.round((e.beat - offsetBeat) * 24);
			let lane = e.lane - 1;
			switch (e.note) {
				case 'Single':
					notesData[index].notes.push({
						type: e.flick ? 'flick' : 'single',
						beat,
						lane,
						txt: `${e.flick ? 'f' : 's'}|${beat}:${lane}`
					});
					break;
				case 'Long': {
					if (e.start) {
						// 99.9999999999%不会出现的错误
						if (long[lane]) {
							let errorTime = calculateTime(e.beat, bpms, true);
							throw new Error(JSON.stringify({
								key: 'laneInvalid',
								data: {
									time: errorTime,
									lane
								}
							}));
						}
						long[lane] = {
							type: 'slide',
							endWithFlick: false,
							part: index,
							beat
						};
					}
					if (e.end) {
						if (e.flick) long[lane].endWithFlick = true;
						console.log(long[lane].beat);
						long[lane].txt =
							`l|${e.flick ? '1' : '0'}|${long[lane].beat}:${lane}|${beat}:${lane}`;
						notesData[long[lane].part].notes.push(long[lane]);
						long[lane] = false;
					}
					break;
				}
				case 'Slide': {
					let pos = e.pos.toLowerCase();
					if (e.start) {
						// 99.9999999999%不会出现的错误
						if (slides[pos]) {
							let errorTime = calculateTime(e.beat, bpms, true);
							throw new Error(JSON.stringify({
								key: 'laneInvalid',
								data: {
									time: errorTime,
									lane: pos
								}
							}));
						}
						slides[pos] = {
							type: 'slide',
							endWithFlick: false,
							part: index,
							beat,
							notes: []
						};
					}
					if (!slides[pos].notes) {
						// 处理用slide写flick的情况
						if (e.end && e.flick) {
							notesData[index].notes.push({
								type: 'flick',
								beat,
								lane,
								txt: `f|${beat}:${lane}`
							});
							break;
						}
						let errorTime = calculateTime(e.beat, bpms, true);
						throw new Error(JSON.stringify({
							key: 'noStart',
							data: {
								time: errorTime
							}
						}));
					}
					slides[pos].notes.push({
						beat,
						lane
					});
					if (e.end) {
						if (e.flick) slides[pos].endWithFlick = true;
						slides[pos].txt =
							`l|${e.flick ? '1' : '0'}|${
								slides[pos].notes.map(v => v.beat + ':' + v.lane).join('|')}`;
						notesData[slides[pos].part].notes.push(slides[pos]);
						slides[pos] = false;
					}
					break;
				}
				default:
					break;
			}
		}
	});
	let nodeTxt = [];
	notesData.forEach(v => {
		if (v.notes.length !== 0) {
			nodeTxt.push(v.txt, ...v.notes.sort((a, b) => a.beat - b.beat).map(v => v.txt));
		}
	});
	return nodeTxt.join('\n');
}

/**
 * beat所对应的时间
 * @param {number} beat
 * @param {*} bpms
 * @param {boolean} format 是否格式化时间
 */
function calculateTime (beat, bpms, format = false) {
	if (bpms.length === 0) return 0;
	// 本部分之前的bpm
	let beforePartBpsm = bpms.slice(0, bpms.length - 1);
	let beforePartTime = 0;
	if (beforePartBpsm.length !== 0) {
		// 计算本部分之前的时间
		beforePartTime = beforePartBpsm.reduce((accumulator, v) => {
			let beatsNumber = v.to - v.from;
			console.log('beatsNumber', beatsNumber);
			beat -= beatsNumber;
			// time = beat数 / bpm *60
			let time = beatsNumber / v.bpm * 60;
			return accumulator + time;
		}, 0);
	}
	// 本部分的bpm
	let partBpm = bpms[bpms.length - 1].bpm;
	let inPartTime = beat / partBpm * 60;
	let time = beforePartTime + inPartTime;
	return format ? `${Math.floor(time / 60)}:${(time % 60).toFixed(3)}` : time;
}
