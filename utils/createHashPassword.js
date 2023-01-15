import bcrypt from 'bcrypt';

export function createHashPassword(password) {
    const SALT_ROUNDS = 8;
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
}