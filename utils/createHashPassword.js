const bcrypt = require('bcrypt');

module.exports = function createHashPassword(password) {
    const SALT_ROUNDS = 8;
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
}