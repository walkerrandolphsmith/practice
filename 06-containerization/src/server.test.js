const request = require('supertest');
const app = require('./server');

describe('HTTP GET /', () => {
    it ('should respond with hello world', done => {
        request(app)
            .get('/')
            .expect(200, "Hello World")
            .end(done);
    });
});

describe('HTTP POST /add', () => {
    it('should return the sum', done => {
        request(app)
            .post('/add')
            .send({ x: 1, y: 1 })
            .expect(200, { "result": 2 })
            .end(done)
    })
})

describe('HTTP GET /user/:id', () => {
    describe('Given a user is in the database', () => {
        it('should return information specific to user with the id of :id', done => {
            request(app)
                .get('/user/3002')
                .expect(200, { "result": { id: 3002, username: "kyle" } })
                .end(done)
        })
    })
    describe('Given the user is not in the database', done => {
        it('should return an error', done => {
            request(app)
                .get('/user/100000')
                .expect(500, { "reason": "ERR1" })
                .end(done)
        })
    })
})