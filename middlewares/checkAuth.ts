import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from '../config'

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader: string | undefined = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Auth failed, there is no authorization header."
            })
        }
        const token: string = authHeader.split(" ")[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, SECRET_KEY);
        }
        catch (error) {
            return res.status(500).json({
                message: "Can't verify authentication token, please login again",
                error
            })
        }
        req.id = decodedToken;
        next()
    }
    catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
            error
        });
    }
}

export const getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Auth failed, There is no authorization header."
            })
        }
        const token = authHeader.split(" ")[1];
        let decodedToken;
        try {
            decodedToken = await jwt.verify(token, SECRET_KEY);
        } catch (error) {
            return res.status(500).json({
                message: "Can't verify authentication token, please login again",
                error
            })
        }
        return decodedToken
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
            error
        });
    }
}