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
            status: [
                { id: 1, title: "Текущие" },
                { id: 2, title: "Предварительные" },
                { id: 3, title: "Завершённые" }
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
                { id: 14, title: "Заказ получен водителем", kind: "driver_received" }
            ]
        },
        drivers: [
            {
                id: 2,
                driver_id: 1,
                name: "DRIVER_NAME1",
                balance: 100.0,
                birthday: "01.01.1980",
                car_id: 1,
                license: "1234567890",
                home_phone: "123456",
                mobile_phone: "+79123456788",
                is_locked: false,
                is_dismissed: false,
                order_params: [3, 4],
                phones: [
                    {
                        phone: "79999999999",
                        is_default: true,
                        use_for_call: true
                    },
                    {
                        phone: "79999999999",
                        is_default: false,
                        use_for_call: true
                    }
                ],
                term_account: "00008",
                auto_model: "Генезис",
                auto_color: "серый",
                auto_number: "ар8000сс",
                auto_attributes: [
                    { id: 1, title: 'Кузов "универсал"', kind: "estate_wagon" },
                    { id: 7, title: "+ 50", kind: "plus_50" },
                    { id: 3, title: "Дети 0 до 12", kind: "children_012" },
                    { id: 9, title: "+ 500", kind: "plus_500" },
                    { id: 5, title: "Вместительный багажник", kind: "big_trunk" }
                ]
            },
            {
                id: 3,
                driver_id: 2,
                name: "DRIVER_NAME2",
                balance: -50.0,
                birthday: "01.01.1980",
                car_id: 2,
                license: "1234567899",
                home_phone: "123457",
                mobile_phone: "+79123456789",
                is_locked: true,
                is_dismissed: true,
                order_params: [5, 6],
                phones: [
                    {
                        phone: "79999999999",
                        is_default: true,
                        use_for_call: true
                    },
                    {
                        phone: "79999999999",
                        is_default: false,
                        use_for_call: false
                    }
                ],
                term_account: "00009",
                auto_model: "Camry",
                auto_color: "синий",
                auto_number: "ве4178ао",
                auto_attributes: [
                    { id: 1, title: 'Кузов "универсал"', kind: "estate_wagon" },
                    { id: 7, title: "+ 50", kind: "plus_50" },
                    { id: 3, title: "Дети 0 до 12", kind: "children_012" },
                    { id: 9, title: "+ 500", kind: "plus_500" },
                    { id: 5, title: "Вместительный багажник", kind: "big_trunk" }
                ]
            },
            {
                id: 5,
                name: "Зубенко Михаил Петрович",
                driver_id: "228322",
                balance: 200,
                name_for_taxophone: "mafioznik",
                phones: [{ phone: "8-800-555-35-35", is_default: true, use_for_call: true }],
                comment: "пустой коммент",
                password: "guest",
                auto_model: "Девятка",
                auto_color: "вишнёвая",
                auto_number: "аа0001аа",
                auto_attributes: [
                    { id: 1, title: 'Кузов "универсал"', kind: "estate_wagon" },
                    { id: 7, title: "+ 50", kind: "plus_50" },
                    { id: 3, title: "Дети 0 до 12", kind: "children_012" },
                    { id: 9, title: "+ 500", kind: "plus_500" },
                    { id: 5, title: "Вместительный багажник", kind: "big_trunk" }
                ]
            }
        ],
        driverFilters: {
            status: [
                {
                    id: 0,
                    kind: "online",
                    title: "Онлайн"
                },
                {
                    id: 1,
                    kind: "free",
                    title: "Свободный"
                },
                {
                    id: 2,
                    kind: "on_order",
                    title: "На заказе"
                },
                {
                    id: 3,
                    kind: "all",
                    title: "Все"
                }
            ],
            group: [
                { id: 0, kind: "group_1", title: "Группа 1" },
                { id: 1, kind: "group_2", title: "Группа 2" },
                { id: 2, kind: "group_3", title: "Группа 3" },
                { id: 3, kind: "all", title: "Все" }
            ]
        },
        driverAutoDetails: {
            attributes: [
                {
                    id: 1,
                    title: 'Кузов "универсал"',
                    kind: "estate_wagon"
                },
                {
                    id: 2,
                    title: "Дети 0 до 7",
                    kind: "children_07"
                },
                {
                    id: 3,
                    title: "Дети 0 до 12",
                    kind: "children_012"
                },
                {
                    id: 4,
                    title: "Пустой багажник",
                    kind: "empty_trunk"
                },
                {
                    id: 5,
                    title: "Вместительный багажник",
                    kind: "big_trunk"
                },
                {
                    id: 6,
                    title: "+ 10",
                    kind: "plus_10"
                },
                {
                    id: 7,
                    title: "+ 50",
                    kind: "plus_50"
                },
                {
                    id: 8,
                    title: "+ 100",
                    kind: "plus_100"
                },
                {
                    id: 9,
                    title: "+ 500",
                    kind: "plus_500"
                },
                {
                    id: 10,
                    title: "Работа по запланированной смене",
                    kind: "planned_shift"
                }
            ]
        },
        photoReviews: {
            reviews: [
                {
                    id: 0,
                    auto_model: "Лада Гранта",
                    auto_color: "Белая",
                    auto_number: "960",
                    startDate: {
                        time: "13:35",
                        date: "12/05/2020"
                    },
                    recieveDate: {
                        time: "13:42",
                        date: "12/05/2020"
                    },
                    comments: "kjdsghjadshgjkdsghkjldsahgjkldhasjg",
                    photos: [
                        {
                            id: 0,
                            kind: "car_front",
                            title: "Спереди",
                            src: "car_front"
                        },
                        {
                            id: 1,
                            kind: "car_left",
                            title: "Слева",
                            src: "car_left"
                        },
                        {
                            id: 2,
                            kind: "car_right",
                            title: "Справа",
                            src: "car_right"
                        },
                        {
                            id: 3,
                            kind: "car_back",
                            title: "Сзади",
                            src: "car_back"
                        }
                    ]
                },
                {
                    id: 1,
                    auto_model: "Лада Гранта",
                    auto_color: "Белая",
                    auto_number: "960",
                    startDate: {
                        time: "13:35",
                        date: "12/05/2020"
                    },
                    recieveDate: {
                        time: "13:42",
                        date: "12/05/2020"
                    },
                    comments: "kjdsghjadshgjkdsghkjldsahgjkldhasjg",
                    photos: [
                        {
                            id: 0,
                            kind: "car_front",
                            title: "Спереди",
                            src: "car_front"
                        },
                        {
                            id: 1,
                            kind: "car_left",
                            title: "Слева",
                            src: "car_left"
                        },
                        {
                            id: 2,
                            kind: "car_right",
                            title: "Справа",
                            src: "car_right"
                        },
                        {
                            id: 3,
                            kind: "car_back",
                            title: "Сзади",
                            src: "car_back"
                        }
                    ]
                },
                {
                    id: 2,
                    auto_model: "Лада Гранта",
                    auto_color: "Белая",
                    auto_number: "960",
                    startDate: {
                        time: "13:35",
                        date: "12/05/2020"
                    },
                    recieveDate: {
                        time: "13:42",
                        date: "12/05/2020"
                    },
                    comments: "kjdsghjadshgjkdsghkjldsahgjkldhasjg",
                    photos: [
                        {
                            id: 0,
                            kind: "car_front",
                            title: "Спереди",
                            src: "car_front"
                        },
                        {
                            id: 1,
                            kind: "car_left",
                            title: "Слева",
                            src: "car_left"
                        },
                        {
                            id: 2,
                            kind: "car_right",
                            title: "Справа",
                            src: "car_right"
                        },
                        {
                            id: 3,
                            kind: "car_back",
                            title: "Сзади",
                            src: "car_back"
                        }
                    ]
                }
            ],
            reviewFilters: {
                status: [
                    {
                        id: 0,
                        kind: "new",
                        title: "Новые"
                    },
                    {
                        id: 1,
                        kind: "on_inspection",
                        title: "На проверке"
                    },
                    {
                        id: 2,
                        kind: "inspected",
                        title: "Готовые"
                    }
                ],
                date: [
                    {
                        id: 0,
                        kind: "today",
                        title: "Сегодня"
                    },
                    {
                        id: 1,
                        kind: "yesterday",
                        title: "Вчера"
                    },
                    {
                        id: 2,
                        kind: "week",
                        title: "Неделя"
                    }
                ],
                sortBy: [
                    {
                        id: 0,
                        kind: "crew",
                        title: "Экипаж"
                    },
                    {
                        id: 1,
                        kind: "name_for_taxofone",
                        title: "Позывной"
                    }
                ]
            }
        },
        reportDetails: {
            orders: {
                orderGroups: [
                    {
                        id: 0,
                        kind: "all",
                        title: "Все"
                    },
                    {
                        id: 1,
                        kind: "group_1",
                        title: "Группа 1"
                    },
                    {
                        id: 2,
                        kind: "group_2",
                        title: "Группа 2"
                    },
                    {
                        id: 3,
                        kind: "group_3",
                        title: "Группа 3"
                    },
                    {
                        id: 4,
                        kind: "group_4",
                        title: "Группа 4"
                    }
                ],
                exportGroups: [
                    {
                        id: 0,
                        kind: "all",
                        title: "Все"
                    },
                    {
                        id: 1,
                        kind: "group_1",
                        title: "Группа 1"
                    },
                    {
                        id: 2,
                        kind: "group_2",
                        title: "Группа 2"
                    },
                    {
                        id: 3,
                        kind: "group_3",
                        title: "Группа 3"
                    },
                    {
                        id: 4,
                        kind: "group_4",
                        title: "Группа 4"
                    }
                ]
            },
            drivers: {
                crewGroups: [
                    {
                        id: 0,
                        kind: "all",
                        title: "Все"
                    },
                    {
                        id: 1,
                        kind: "crew_1",
                        title: "Экипаж 1"
                    },
                    {
                        id: 2,
                        kind: "crew_2",
                        title: "Экипаж 2"
                    },
                    {
                        id: 3,
                        kind: "crew_3",
                        title: "Экипаж 3"
                    },
                    {
                        id: 4,
                        kind: "crew_4",
                        title: "Экипаж 4"
                    }
                ],
                crewMembers: [
                    {
                        id: 0,
                        kind: "all",
                        title: "Все"
                    },
                    {
                        id: 1,
                        kind: "member_1",
                        title: "Фамилия И.О"
                    },
                    {
                        id: 2,
                        kind: "member_2",
                        title: "Фамилия И.О"
                    },
                    {
                        id: 3,
                        kind: "member_3",
                        title: "Фамилия И.О"
                    },
                    {
                        id: 4,
                        kind: "member_4",
                        title: "Фамилия И.О"
                    }
                ]
            },
            datePeriods: [
                { id: 0, kind: "today", title: "Сегодня" },
                { id: 1, kind: "yesterday", title: "Вчера" },
                { id: 2, kind: "week", title: "Неделя" },
                { id: 3, kind: "month", title: "Месяц" }
            ]
        },
        infos: {
            messages: [
                {
                    id: 0,
                    text:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta fringilla nunc, ac rhoncus turpis. Sed vel nunc luctus, placerat ligula et, porttitor dui.",
                    time: "12:35"
                },
                {
                    id: 1,
                    text:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta fringilla nunc, ac rhoncus turpis. Sed vel nunc luctus, placerat ligula et, porttitor dui.",
                    time: "12:35"
                }
            ],
            cities: [
                { id: 0, title: "Все" },
                { id: 1, title: "Город 1" },
                { id: 2, title: "Город 2" },
                { id: 3, title: "Город 3" }
            ],
            groups: [
                { id: 0, title: "Все" },
                { id: 1, title: "Группа 1" },
                { id: 2, title: "Группа 2" },
                { id: 3, title: "Город 3" }
            ]
        },
        chats: {
            chatPreviews: [
                {
                    id: 0,
                    name: "Иванов И.И",
                    lastMessage: "This is a message"
                },
                {
                    id: 1,
                    name: "Стегний С.Б",
                    lastMessage: "This is a message"
                },
                {
                    id: 2,
                    name: "Иванов И.И",
                    lastMessage: "This is a message"
                },
                {
                    id: 3,
                    name: "Иванов И.И",
                    lastMessage: "This is a message"
                },
                {
                    id: 4,
                    name: "Иванов И.И",
                    lastMessage: "This is a message"
                },
                {
                    id: 5,
                    name: "Иванов И.И",
                    lastMessage: "This is a message"
                },
                {
                    id: 6,
                    name: "Иванов И.И",
                    lastMessage: "This is a message"
                },
                {
                    id: 7,
                    name: "Иванов И.И",
                    lastMessage: "This is a message"
                }
            ],
            chatFilters: {
                groups: [
                    {
                        id: 0,
                        kind: "all",
                        title: "Все"
                    },
                    {
                        id: 1,
                        kind: "group_1",
                        title: "Группа 1"
                    },
                    {
                        id: 2,
                        kind: "group_2",
                        title: "Группа 2"
                    },
                    {
                        id: 3,
                        kind: "group_3",
                        title: "Группа 3"
                    }
                ],
                operators: [
                    {
                        id: 0,
                        name: "Фамилия И.О"
                    },
                    {
                        id: 1,
                        name: "Фамилия И.О"
                    },
                    {
                        id: 2,
                        name: "Фамилия И.О"
                    },
                    {
                        id: 3,
                        name: "Фамилия И.О"
                    },
                    {
                        id: 4,
                        name: "Фамилия И.О"
                    }
                ],
                status: [
                    {
                        id: 0,
                        kind: "online",
                        title: "Онлайн"
                    },
                    {
                        id: 1,
                        kind: "offline",
                        title: "Не в сети"
                    },
                    {
                        id: 2,
                        kind: "all",
                        title: "Все"
                    }
                ]
            }
        }
    },
    mutations: {
        toggleWindow(state, window) {
            for (var key in state.windows) {
                if (key === window) {
                    state.windows[key] = !state.windows[key];
                } else {
                    state.windows[key] = false;
                }
            }
        },
        changeStatus(state, { order_id, status_id }) {
            const stateStatus = state.orderDetails.orderStates.find(s => s.id === status_id);
            state.orders = state.orders.map(o =>
                +o.id === +order_id
                    ? { ...o, state_kind: stateStatus.kind, state_id: stateStatus.id }
                    : o
            );
        },
        addOrder(state, order) {
            state.orders = [...state.orders, { ...order }];
        },
        addDriver(state, order) {
            state.drivers = [...state.drivers, { ...order }];
        },
        setDriver(state, driver) {
            state.drivers = state.drivers.map(d => {
                return d.id === driver.id ? driver : d;
            });
        }
    },
    actions: {
        createOrder({ commit }, order) {
            setTimeout(() => {
                commit("addOrder", order);
            }, 2000);
        },
        createDriver({ commit }, driver) {
            setTimeout(() => commit("addDriver", driver), 2000);
        },
        async editDriver({ commit }, driver) {
            setTimeout(() => commit("setDriver", driver), 2000);
        },
        updateStatus({ commit }, payload) {
            setTimeout(() => {
                commit("changeStatus", payload);
            }, 2000);
        }
    }
});
