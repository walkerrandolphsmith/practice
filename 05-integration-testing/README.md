## Integration Tests

Want to put those unit testing skills to test? We could extract the implementation details of endpoint handlers into functions and unit test them.
We can go a step further and run some "integration tests" to ensure that when the server is running it responds to the endpoints correctly. Integration tests make assertions about the behavior of a sub-system of code instead of an atomic unit of code.

Similar to the unit tests exercise we can use a package to facilitate writing our tests.

```
npm i --save-dev mocha supertest
```

We'll create a test suite in index.test.js. Notice I don't name it `.spec.js` because that is reserved for unit tests.

```
touch index.test.js
```

Let's describe the scenario of making an HTTP GET request to `~/` the responds with "hello world"

```
const request = require('supertest');
const app = require('./server');

describe('HTTP GET /', () => {
    it ('should respond with hello world', done => {
        request(app).get('/')
        .expect(200, "Hello World")
        .end(done);
    });
});
```

Since there is network latency in making the HTTP request we will inject a function named `done` to tell the test suite when the response has been received and evaluated. Also, we'll have to make our app a public member in order to reference it

```
module.exports = app;
```

Now we can run our test suite and see a passing test .... but the terminal also doesn't receive an exit code. That will be a problem later so let's figure out how to fix it...

In our index.js file, we invoke `listen` function which makes the process continue indefinitely which ultimately is what keeps the terminal from receiving that exit code. Let's extract out everything about our app execpt the invocation to listen.

```
touch server.js
mv index.test.js server.test.js
```

Update index.js

```
const app = require('./server');

app.listen(3000, function() {
    console.log('Now accepting requests at http://localhost:3000');
});
```

Update server.js

```
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => response.status(200).send('Hello World'));
app.get('/ping', (request, response) => response.status(200).send({ "message": "pong" }));

app.post('/add', (request, response) => {
    const body = request.body;
    const sum = body.x + body.y;
    return response.status(200).send({ "result": sum });
});

app.post('/divide', (request, response) => {
    const body = request.body;
    const numerator = body.numerator;
    const denominator = body.denominator;
    if (denominator === 0) return response.status(500).send({ "reason": "ERR1" });
    return response.status(200).send({ "result": numerator/denominator });
});

module.exports=app;
```

Now run the test suite and see it pass the test and send the terminal the exit code telling it the process is complete

Let's write one more test for the add endpoint.

```
describe('HTTP POST /add', () => {
    it('should return the sum', done => {
        request(app)
            .post('/add')
            .send({ x: 1, y: 1 })
            .expect(200, { "result": 2 })
            .end(done)
    })
})
```

Now let's consider multiplication. Most programming languages provide a multiplication operator as a language feature, such as `*`, however, multiplication is actually just repeated addition. So the product of 2 and 3 can be determined by adding 2 to itself 3 times. We can implement a function that multiples by relying on the add function that we have confidence in from its unit test coverage.

This is a contrived example, but the point being demonstrated is a function that depends on another function. Testing multiply has overlap with the add function. If the add function does not work then the multiply function does not work. We are not able to test the multiply function in isolation because it depends on the add function.

We can write an end to end tests for multiply covering various equivalence classes:

```
describe('/math/multiply', () => {
    describe('Given one factor is 0', () => {
        it('then the product is 0', () => {
            expect(multiply(0, 100)).to.equal(0);
        })
    })
    describe('Given both factors are non-zero whole numbers', () => {
        it('then the product is equal to the repeated addition of the multiplicand, multiplier times', () => {
            expect(multiply(2, 3)).to.equal(6);
        })
    })
})
```
