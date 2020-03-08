export function isFaved (state) {
	return (id, type) => {
		return (state.favList.filter(v => {
			return v.id === id && v.type === type;
		})).length > 0;
	};
}
