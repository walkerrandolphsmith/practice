const app = require('./server');
const port = 3000;

app.listen(port, function() {
    console.log(`Now accepting requests at http://${process.env.HOSTNAME}:${port}`);
});