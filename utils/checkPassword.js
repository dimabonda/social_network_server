import bcrypt from 'bcrypt';

export const checkPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);
