const request = require("supertest");
const app = require("./server");
const usersById = require("./server").usersById;

describe("HTTP GET /user", () => {
  it("should respond with all users keyed by id", (done) => {
    request(app)
      .get("/user")
      .expect(200, {
        1: { username: "kyle" },
      })
      .end(done);
  });
});
