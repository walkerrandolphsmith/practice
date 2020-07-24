rsconf = {
    _id: "rs0",
    members: [
        { _id: 0, host: 'db:27017'},
        { _id: 1, host: 'db-replica:27017'},
        { _id: 2, host: 'db-replica-2:27017'}
    ]
}

rs.initiate(rsconf);

rs.conf();