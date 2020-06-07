/*
    !Required fields:
    
    * Client Number
    * Client Name
    * Client Group
    * Origin
    * Stops if not empty
    * Destination
    * Crew group
    * Crew
    * Time till served
    * Tarrif
    * Order state
    * Time stemp (mins + date)
    * Travelcost (total)

*/

const example = {
    comment: "Go to Niko and smoke hookah",
    id: 582.6830404073493,
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
};
