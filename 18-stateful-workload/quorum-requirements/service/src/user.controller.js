const UserService = require("./user.service");

const errorsByCode = {
  1: "A user with the specified ID was not found",
  2: "A user with the specified username was not found",
  3: "User already exists",
  4: "Username must be a non-empty string",
  5: "An unknown error has occured",
};

const getError = (code) => ({ code: code, reason: errorsByCode[code] });

module.exports = {
  handleGetAll: (request, response) => {
    const username = request.query.username;
    if (username) {
      return UserService.getByUsername(username)
        .then((user) => {
          if (!user) return response.status(404).send(getError(2));
          return response.status(200).send(user);
        })
        .catch(() => response.status(500).send(getError(5)));
    }
    return UserService.getAll()
      .then((usersById) => response.status(200).send(usersById))
      .catch((error) => response.status(500).send(error));
  },
  handleCreate: (request, response) => {
    const requestBody = request.body;
    const username = requestBody.username;
    if (!requestBody || !username || typeof username !== "string")
      return response.status(400).send(getError(4));

    UserService.create(username)
      .then((user) => {
        return response.status(201).send(user);
      })
      .catch(() => response.status(409).send(getError(3)));
  },
  handleGetById: (request, response) => {
    const id = request.params.id;
    return UserService.getById(id)
      .then((user) => {
        if (!user) return response.status(404).send(getError(2));
        return response.status(200).send(user);
      })
      .catch(() => response.status(404).send(getError(2)));
  },
  handleDelete: (request, response) => {
    const id = request.params.id;
    return UserService.deleteById(id)
      .then((wasDeleted) => {
        if (wasDeleted) return response.status(200).send();
        return response.status(404).send(getError(2));
      })
      .catch(() => response.status(500).send(getError(5)));
  },
};
