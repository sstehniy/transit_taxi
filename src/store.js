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
            },
            {
                comment: "Go to Niko and smoke hookah",
                id: 7,
                state_id: 1,
                state_kind: "sent_to_driver",
                server_time_offset: 0,
                start_time: "20130204181111",
                source_time: "20130204181111",
                source: "Torronto",
                source_lat: 52.192652,
                source_lon: 54.627506,
                destination: "IZBA",
                destination_lat: 42.372136,
                destination_lon: 51.240732,
                stops: [{ address: "Poltava", lat: 53.023744, lon: 41.937491, id: 0 }],
                customer: "Dan Stehniy",
                passanger: "Dan Stehniy",
                crew_id: 1,
                order_crew_group_id: 1,
                is_prior: true,
                driver_id: 0,
                car_id: 0,
                auto_search_driver: true,
                name: "Dan Stehniy",
                phone: "1-234-567-89-0",
                client_id: 140,
                save_client: true,
                tariff_id: 1,
                hourly_payment: true,
                two_way_ride: true,
                attributes: [
                    { id: 2, title: "Attribute 2" },
                    { id: 1, title: "Детское кресло" }
                ],
                total_cost: "550",
                cashless_sum: "322",
                cash_sum: "228",
                timestamp: { minutes: "322", date: "14/88/1939" }
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
                { id: 1, title: "Отправлено водителю", kind: "sent_to_driver" },
                { id: 2, title: "Статус 2", kind: "status_2" },
                { id: 3, title: "Статус 3", kind: "status_3" }
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
