const axios = require("axios");

const IP_ADDRESS = process.env.IP_ADDRESS;
const PORT = process.env.PORT;
const NAMESPACE = process.env.NAMESPACE;
const POD_NAME = process.env.POD_NAME;

console.log("Running job at ", new Date().toLocaleTimeString());

const getSchedule = () =>
  axios
    .get(`${IP_ADDRESS}:${PORT}/api/v1/namespace/${NAMESPACE}/pods/${POD_NAME}`)
    .then(console.log)
    .catch(console.log);

getSchedule();
