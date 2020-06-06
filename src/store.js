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
        orders: [
            {
                id: 1,
                number: 3453,
                status: "Принят",
                origin: "ул. Дальняя, д.35(Шахты)",
                destination: "ул. Левобережная, д. 67, п.#1 (Шахты)",
                timestamp: "13:42",
                date: "12:05:2020",
                driverNumber: 110,
                driverName: "Водитель 7"
            },
            {
                id: 2,
                number: 3453,
                status: "Принят",
                origin: "ул. Дальняя, д.35(Шахты)",
                destination: "ул. Левобережная, д. 67, п.#1 (Шахты)",
                timestamp: "13:42",
                date: "12:05:2020",
                driverNumber: 110,
                driverName: "Водитель 7"
            },
            {
                id: 3,
                number: 3453,
                status: "Принят",
                origin: "ул. Дальняя, д.35(Шахты)",
                destination: "ул. Левобережная, д. 67, п.#1 (Шахты)",
                timestamp: "13:42",
                date: "12:05:2020",
                driverNumber: 110,
                driverName: "Водитель 7"
            },
            {
                id: 4,
                number: 3453,
                status: "Принят",
                origin: "ул. Дальняя, д.35(Шахты)",
                destination: "ул. Левобережная, д. 67, п.#1 (Шахты)",
                timestamp: "13:42",
                date: "12:05:2020",
                driverNumber: 110,
                driverName: "Водитель 7"
            },
            {
                id: 5,
                number: 3453,
                status: "Принят",
                origin: "ул. Дальняя, д.35(Шахты)",
                destination: "ул. Левобережная, д. 67, п.#1 (Шахты)",
                timestamp: "13:42",
                date: "12:05:2020",
                driverNumber: 110,
                driverName: "Водитель 7"
            },
            {
                id: 6,
                number: 3453,
                status: "Принят",
                origin: "ул. Дальняя, д.35(Шахты)",
                destination: "ул. Левобережная, д. 67, п.#1 (Шахты)",
                timestamp: "13:42",
                date: "12:05:2020",
                driverNumber: 110,
                driverName: "Водитель 7"
            }
        ],
        orderDetails: {
            tariffs: [
                { id: 1, title: "Тариф 1" },
                { id: 2, title: "Тариф 2" },
                { id: 3, title: "Тариф 3" }
            ],
            attributes: [
                { id: 1, title: "Детское кресло" },
                { id: 2, title: "Attribute 2" },
                { id: 3, title: "Attribute 3" }
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
                { id: 1, title: "Отправлено водителю" },
                { id: 2, title: "Статус 2" },
                { id: 3, title: "Статус 3" }
            ]
        }
    },
    mutations: {
        toggleOrders(state) {
            state.ordersOpen = !state.ordersOpen;
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
        },
        addOrder(state, order) {
            state.orders = [...state.orders, { ...order }];
        }
    },
    actions: {
        createOrder({ commit }, order) {
            setTimeout(() => {
                commit("addOrder", order);
            }, 2000);
        }
    }
});
