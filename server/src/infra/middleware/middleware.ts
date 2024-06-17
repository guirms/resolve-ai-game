import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any): any => {
        if (err) {
            console.error(err);
            return res.sendStatus(403);
        }

        req.user = decoded.userId;
        next();
    });
};