import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userName: 'yhadmin'
	},
	mutations: {
		userInfo (state, userName) {
			state.userName = state.userName;
		}
	},
	actions: {
	}
})
