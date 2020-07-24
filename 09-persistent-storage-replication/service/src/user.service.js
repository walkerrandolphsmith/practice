const User = require('./user.model');

module.exports= {
    getAll: () => User
        .find({})
        .then(users => {
            const usersById = users.reduce((acc, next) => {
                return Object.assign(acc, { [next._id]: { id: next._id, username: next.username } })
            }, {})
            return usersById
        }),
    getByUsername: (username) => User
        .findOne({ username: username })
        .then(user => {
            if (!user) return null
            return { id: user._id, username: user.username };
        }),
    getById: (id) => User
        .findById(id)
        .then(user => {
            if (!user) return null;
            return { id: user._id, username: user.username };
        }),
    deleteById: (id) => User
        .deleteOne({ id: id })
        .then(transactionRecord => {
            return transactionRecord.ok === 1 && transactionRecord.deletedCount > 0
        }),
    create: (username) => User
        .create({ username: username })
        .then((user) => {
            return { id: user._id, username: user.username }
        })
}