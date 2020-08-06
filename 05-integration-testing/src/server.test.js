const request = require("supertest");
const app = require("./server");

describe("HTTP GET /", () => {
  it("should respond with hello world", (done) => {
    request(app).get("/").expect(200, "Hello World").end(done);
  });
});

describe("HTTP POST /add", () => {
  describe("given x and y are provided", () => {
    it("should return the sum", (done) => {
      request(app)
        .post("/add")
        .send({ x: 1, y: 1 })
        .expect(200, { result: 2 })
        .end(done);
    });
  });

  describe("given x is not provided", () => {
    it("should respond with 400", (done) => {
      request(app)
        .post("/add")
        .send({ y: 1 })
        .expect(400, { reason: "x is required in the request body" })
        .end(done);
    });
  });

  describe("given y is not provided", () => {
    it("should respond with 400", (done) => {
      request(app)
        .post("/add")
        .send({ x: 1 })
        .expect(400, { reason: "y is required in the request body" })
        .end(done);
    });
  });
});
