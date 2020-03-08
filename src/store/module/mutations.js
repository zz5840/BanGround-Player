export function openSettings (state) {
	state.showSettings = true;
}

export function setSettings (state, payload) {
	state.showSettings = payload;
}

export function setGameLoadConfig (state, payload) {
	state.GameLoadConfig = payload;
}

export function delFav (state, payload) {
	state.favList.splice(payload, 1);
}

export function delFavById (state, payload) {
	let { id, type } = payload;
	let index = state.favList.findIndex(v => {
		return v.id === id && v.type === type;
	});
	if (index !== -1) {
		state.favList.splice(index, 1);
	}
}

export function addFav (state, payload) {
	let { id, type, name } = payload;
	state.favList.unshift({
		id,
		type,
		name
	});
}

export function addHistory (state, payload) {
	let { id, type, name } = payload;
	let arr = state.historyList;
	arr.unshift({
		id,
		type,
		name
	});
	state.historyList = arr.slice(0, 100);
}

export function updateTab (state, payload) {
	state.tab = payload;
}

export function updatePlayDataFrom (state, payload) {
	state.playData.from = payload;
}

export function updatePlayDataLoadInfo (state, payload) {
	state.playData.loadInfo = payload;
}

export function updatePlayDataBestdoriId (state, payload) {
	state.playData.bestdori.id = payload;
}

export function updatePlayDataBestdoriMapType (state, payload) {
	state.playData.bestdori.mapType = payload;
}

export function updatePlayDataBestdoriDifficulty (state, payload) {
	state.playData.bestdori.difficulty = payload;
}

export function updatePlayDataLocalType (state, payload) {
	state.playData.local.type = payload;
}

export function updatePlayDataLocalMapFile (state, payload) {
	state.playData.local.mapFile = payload;
}

export function updatePlayDataLocalMapSource (state, payload) {
	state.playData.local.mapSource = payload;
}

export function updatePlayDataLocalMusic (state, payload) {
	state.playData.local.music = payload;
}

export function updatePlayDataLocalSongName (state, payload) {
	state.playData.local.songName = payload;
}
