import jwt from 'jsonwebtoken'

export class TokenService {
    static generateToken({ id, email }) {

        const expiresInOneHour = Date.now() + 60 * 60 * 1000; // 1 hour

        console.log(process.env.JWT_SECRET);
        console.log(id, email);
        const token = jwt.sign(
            { id, email },
            process.env.JWT_SECRET,
            { expiresIn: expiresInOneHour }
        );

        return token;

    }
}