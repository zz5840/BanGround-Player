export function openSettings (state) {
	state.showSettings = true;
}

export function setSettings (state, payload) {
	state.showSettings = payload;
}

export function setGameLoadConfig (state, payload) {
	state.GameLoadConfig = payload;
}
