import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ordersOpen: false,
        windows: {
            orders: false,
            drivers: false,
            info: false,
            reports: false,
            chat: false
        },
        orderDetails: {
            tarrifs: [
                { id: 1, title: "Тариф 1" },
                { id: 2, title: "Тариф 2" },
                { id: 3, title: "Тариф 3" }
            ],
            crewGroups: [
                { id: 1, title: "Группа 1" },
                { id: 2, title: "Группа 2" },
                { id: 3, title: "Группа 3" }
            ],
            crews: [
                { id: 1, title: "Экипаж 1" },
                { id: 2, title: "Экипаж 2" },
                { id: 3, title: "Экипаж 3" }
            ],
            orderStates: [
                { id: 1, title: "Экипаж 1" },
                { id: 2, title: "Экипаж 2" },
                { id: 3, title: "Экипаж 3" }
            ]
        }
    },
    mutations: {
        toggleOrders(state) {
            if (state.ordersOpen === false) {
                state.ordersOpen = true;
            } else {
                state.ordersOpen = false;
            }
        },
        toggleWindow(state, window) {
            for (var key in state.windows) {
                if (key === window) {
                    if (state.windows[key] === false) {
                        state.windows[key] = true;
                    } else {
                        state.windows[key] = false;
                    }
                } else {
                    state.windows[key] = false;
                }
            }
        }
    },
    actions: {}
});
