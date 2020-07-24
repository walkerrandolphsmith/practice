# Replica Sets

Now that we've scaled our service and can handle the customer load we're still bottlenecked when reading and writing to a single database server.

With many databases, you can create read replicas for higher availability. In the case of mongo it requires at least three mongo instances; 1 primary and 2 or more secondaries. The primary is elected by the group via a round of communication and has read and write capabilities. Therefore policies can be put in place to govern how stale a read replica's data can be. If only one instance gets updated with writes then the replicas will need to synchronize with the newest data.

If the primary goes offline for any reason the remaining instances will elect a new primary, promoting one of the secondary instances. There needs to be an odd number of instances to avoid ties or else one will need to be an arbitrator and break tie votes.

## Create the primary

Update our existing configuration of the DB by adding

```
build:
    context: ./db-primary
    dockerfile: Dockerfile
```

We'll create an image based on mongo, copy a mongo config, expose the default port and finally add a run command

```
FROM mongo

WORKDIR /usr/src/configs

COPY mongo.conf .

EXPOSE 27017

CMD ["--config", "./mongo.conf"]
```

## Replicas

Next, we'll create two more services in our docker-compose file for the secondaries. Let's call them `db-replica` and `db-replica-2`. Our `db` service will depend on them so let's update it first. Next each replica will need its own volume to mount to so add `db-replica` and `db-replica-2` volumes. Since our primary is consuming 27017 externally our replicas will need 27018 and 27019 ports respectively. We'll name the replica rs0.

```
volumes:
  db:
  db-replica:

db
  depends_on:
    - db-replica
    - db-replica-2

db-replica:
    image: mongo
    ports:
      - "27018:27017"
    networks:
      - intranet
    volumes:
      - db-replica:/data/db
    restart: always
    command: --replSet rs0
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongo mongo:27017/test --quiet
      interval: 10s
      timeout: 10s
      retries: 5
      start_period: 40s
```

## Replica Setup

We'll need one more service to initiate the primary election. It will depend on the `db` service which in turn depends on the replicas.

```
  db-setup:
    build:
      context: ./db-setup
      dockerfile: Dockerfile
    networks:
      - intranet
    depends_on:
      - db
```

We'll create an image that first copies scripts and then adds a command that will run a shell script to connect to mongo and provide it will a javascript file to execute. The script mongo receives will establish the replica name as rs0 and indicate the mongo instances involved, `db:27017`, `db-replica:27017`, and `db-replica-2:27017`

```
FROM mongo

WORKDIR /usr/src/configs

COPY replicaSet.js .
COPY setup.sh .

CMD ["./setup.sh"]
```

```
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
```

```
#!/bin/bash
echo ************************************************
echo ************************************************
echo ************************************************
echo Starting the replica set
echo ************************************************
echo ************************************************
echo ************************************************
sleep 5 | echo Sleeping
mongo mongodb://db:27017/ replicaSet.js
```

Ensure all mongo services and the setup service are on the same intranet network.
Also, update the enviornment variable for the mongo URI passed to our HTTP service to include the replicas and the name of the replicaSet as a query parameter.

```
MONGO_URI=mongodb://db:27017,db-replica:27017,db-replica-2:27017/dev-deb?replicaSet=rs0
```

Our HTTP service can be made more resilient by updating its connection settings to

```
const connect = () => mongoose.connect(MONGO_URI, {
  replset: { rs_name: "rs0" },
  poolSize: 5,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500
})
```
