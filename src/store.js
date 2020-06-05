import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ordersOpen: false,
        windows: {
            orders: false,
            drivers: false,
            info: false,
            reports: false,
            chat: false
        }
    },
    mutations: {
        toggleOrders(state) {
            if (state.ordersOpen === false) {state.ordersOpen = true}
            else {state.ordersOpen = false}
        },
        toggleWindow(state, window) {
            for (var key in state.windows) {
                if (key === window){
                    if (state.windows[key] === false) {state.windows[key] = true}
                    else {state.windows[key] = false}
                }
                else {state.windows[key] = false}
            }
        }
    },
    actions: {

    }
})