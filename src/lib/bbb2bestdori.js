import { accurateFloat } from 'src/lib/Utils';

export default function bbb2bestdori (bbb) {
	let rawList = bbb.split('\n').filter(v => v !== '').map(v => v.split('|'));
	let parts = [];
	let firstBPM = true;
	let output = [];
	let bpms = [];
	let startPartFrom = 0;
	rawList.forEach(v => {
		if (v[0] === '+') {
			let offset = parseFloat(v[1]);
			let bpm = parseFloat(v[2]);
			if (firstBPM) {
				let [cmds, bpms1] = calculateBeginning(offset, bpm);
				output.push(...cmds);
				bpms.push(...bpms1);
				startPartFrom = output.length - 1;
				firstBPM = false;
			}
			parts.push({
				offset,
				bpm,
				notes: []
			});
			bpms.push({ from: offset, bpm });
		} else {
			parts[parts.length - 1].notes.push(v);
		}
	});
	bpms.forEach((v, i) => {
		if (i > 0) bpms[i - 1].to = v.from;
	});
	console.log(bpms);
	parts.forEach((v, i) => {
		console.log('Part ' + i);
		let partData = [
			{ type: 'System', cmd: 'BPM', bpm: v.bpm, beat: calculateBeat(startPartFrom + i, 0, bpms) }
		];
		let slides = {
			a: false,
			b: false
		};
		v.notes.forEach((note) => {
			let type = note[0];
			switch (type) {
				case 's':
				case 'f': {
					let noteData = parseNote(note[1]);
					// 删除已经为空的slide
					if (slides.a && noteData.beat >= slides.a.to) slides.a = false;
					if (slides.b && noteData.beat >= slides.b.to) slides.b = false;
					let data = {
						type: 'Note',
						note: 'Single',
						lane: noteData.lane + 1,
						beat: calculateBeat(startPartFrom + i, noteData.beat, bpms)
					};
					if (type === 'f') data.flick = true;
					partData.push(data);
					break;
				}
				case 'l': {
					let slidePos = '';
					let notesList = note.slice(2);
					let firstNote = parseNote(notesList[0]);
					let lastNote = parseNote(notesList[notesList.length - 1]);
					// 删除已经为空的slide
					if (slides.a && firstNote.beat > slides.a.to) slides.a = false;
					if (slides.b && firstNote.beat > slides.b.to) slides.b = false;
					if (!slides.a) {
						slidePos = 'a';
					} else if (!slides.b) {
						slidePos = 'b';
					} else {
						throw new Error(`在${calculateTime(startPartFrom + i, firstNote.beat, bpms, true)}处发现多押，由于目前Bestdori未支持多押，请修改后再次尝试。`);
					}
					slides[slidePos] = {
						from: firstNote.beat,
						to: lastNote.beat
					};
					let endWithFlick = note[1] === '1';
					notesList.forEach((noteInSlide, index) => {
						let noteData = parseNote(noteInSlide);
						let isEnd = index === notesList.length - 1;
						let data = {
							type: 'Note',
							note: 'Slide',
							pos: slidePos.toUpperCase(),
							start: index === 0,
							lane: noteData.lane + 1,
							beat: calculateBeat(startPartFrom + i, noteData.beat, bpms)
						};
						if (isEnd) {
							data.end = true;
							if (endWithFlick) data.flick = true;
						}
						partData.push(data);
					});
					break;
				}
				default:
					break;
			}
		});
		partData = partData.sort((a, b) => a.beat - b.beat);
		output.push(...partData);
	});
	return JSON.stringify(output);
}

/**
 * 计算偏移
 * @param {number} offset
 */
function calculateBeginning (offset) {
	let list = [];
	let bpms = [];
	let remainOffset = offset;
	let startBeat = 0;
	let startTime = 0;
	[60, 120, 300, 600, 1200, 3000, 6000, 12000, 30000, 60000].forEach(bpm => {
		let secondPerBeat = 1 / (bpm / 60);
		let beat = Math.floor(remainOffset / secondPerBeat);
		if (beat > 0) {
			let time = beat * secondPerBeat;
			remainOffset = accurateFloat(remainOffset - time);
			list.push({ type: 'System', cmd: 'BPM', bpm, beat: startBeat });
			bpms.push({ from: startTime, bpm });
			startBeat += beat;
			startTime += time;
			console.log({ remainOffset, bpm, secondPerBeat, beat });
		}
		if (remainOffset === 0) {
			return false;
		}
	});
	return [list, bpms];
}

/**
 * 第n个part中第m个1/24note所在的beat
 * @param {number} part
 * @param {number} note
 * @param {*} bpms
 */
function calculateBeat (part, note, bpms) {
	// 该note之前的所有部分
	let partBeforeNote = bpms.filter((v, i) => i <= part);
	// 该note之前的所有部分的beats数目
	let beatsBeforeNotePart = partBeforeNote.reduce((accumulator, v) => {
		// 总beats数 = bpm*时间(s)/60
		let beatsNumber = accurateFloat(v.bpm * (v.to - v.from) / 60);
		// console.log(v, beatsNumber);
		return accumulator + beatsNumber;
	}, 0);
	// 第n个1/24 note之前的beats = note / 24
	let beatsBeforeInPart = accurateFloat(note / 24);
	return beatsBeforeNotePart + beatsBeforeInPart;
}

/**
 * 第n个part中第m个note所在的时间
 * @param {number} part
 * @param {number} note
 * @param {*} bpms
 * @param {boolean} format 是否格式化时间
 */
function calculateTime (part, note, bpms, format) {
	// 该部分之前的时间 = 该部分的offset
	let timeBeforePart = bpms[part + 1].from;
	// 该部分中该1/24note之前的时间 = ((note / 24) / bpm) * 60
	let timeBeforeNote = ((note / 24) / bpms[part + 1].bpm) * 60;
	let time = timeBeforeNote + timeBeforePart;
	return format ? `${Math.floor(time / 60)}:${(time % 60).toFixed(3)}` : time;
}

function parseNote (note) {
	note = note.split(':');
	return {
		beat: parseInt(note[0]),
		lane: parseInt(note[1])
	};
}
