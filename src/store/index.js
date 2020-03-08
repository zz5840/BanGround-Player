import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import module from './module';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
	const Store = new Vuex.Store({
		...module,
		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV,
		plugins: [createPersistedState({
			reducer (state) {
				return {
					favList: state.favList,
					historyList: state.historyList,
					playData: {
						bestdori: state.playData.bestdori
					}
				};
			}
		})]
	});

	return Store;
}
