const app = require('./server');
const port = 3000;
const containerId=process.env.HOSTNAME;
app.get('/healthcheck', (request, response) => response.status(200).send(containerId));

app.listen(port, function() {
    console.log(`Now accepting requests at http://${containerId}:${port}`);
});