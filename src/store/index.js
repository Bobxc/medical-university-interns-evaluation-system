import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuList: 123,
    },
    mutations: {
        SAVE_MENU_LIST(state, menus) {
            state.menuList = menus
        },
        CLEAR_MENU_LIST(state) {
            state.menuList = []
        }
    },
    actions: {

    },
    modules: {}
})

export default store