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
            /*{
                id: 1,
                number: 3453,
                status: "Принят",
                origin: "ул. Дальняя, д.35(Шахты)",
                destination: "ул. Левобережная, д. 67, п.#1 (Шахты)",
                timestamp: "13:42",
                date: "12:05:2020",
                driverNumber: 110,
                driverName: "Водитель 7"
            },*/
            {
                comment: "Go to Niko and smoke hookah",
                id: 1,
                state_id: 1,
                state_kind: "accepted",
                source: "Toronto",
                source_lat: 52.192652,
                source_lon: 54.627506,
                destination: "Izba",
                destination_lat: 42.372136,
                destination_lon: 51.240732,
                stops: [{ address: "Ottawa", lat: 53.023744, lon: 41.937491, id: 0 }],
                customer: "Bob Burger",
                passanger: "Bob Burger",
                crew_id: 1,
                order_crew_group_id: 1,
                is_prior: true,
                auto_search_driver: true,
                name: "Bob Burger",
                phone: "1-234-567-89-0",
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
                timestamp: { minutes: "22", date: "14/04/2020" }
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
                { id: 1, title: "Принят", kind: "accepted" },
                { id: 2, title: "В работе", kind: "working" },
                { id: 3, title: "В очереди ", kind: "queued" },
                { id: 4, title: "Выполнен", kind: "done" },
                { id: 5, title: "Прекращён", kind: "stoppded" },
                { id: 6, title: "Нет машин", kind: "nocars" },
                { id: 7, title: "Водитель принял заказ", kind: "driver_accepted" },
                { id: 8, title: "Водитель принял заказ по времени", kind: "driver_accpeted_time" },
                { id: 9, title: "Водитель отказался от заказа", kind: "driver_canceled" },
                { id: 10, title: "Водитель подъехал на место", kind: "driver_arrived" },
                { id: 11, title: "Клиент в машине", kind: "client_seated" },
                { id: 12, title: "Клиент не вышел", kind: "client_late" },
                { id: 13, title: "Заказ отправлен водителю", kind: "sent_to_driver" },
                { id: 14, title: "Заказ получен водителем", kind: "driver_received" },
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
        changeStatus(state, order_id, status) {
            state.orders[order_id - 1].state_kind = state.orderDetails.orderStates[status - 1].kind;
            state.orders[order_id - 1].state_id = status;
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
        },
        updateStatus({ commit }, order_id, status) {
            setTimeout(() => {
                commit("changeStatus", order_id, status);
            }, 2000);
        }
    }
});
