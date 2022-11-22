import { Request, Response, NextFunction } from 'express';
import csrf from 'csrf'

let csrfToken: any
let secret: string
export const initCsrfToken = () => {
    csrfToken = new csrf
}

export const createCsrfToken = () => {
    secret = csrfToken.secretSync()
    console.log({secret})
    const token: string = csrfToken.create(secret)
    return token
}

export const verifyCsrfToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.xsrftoken
    console.log(token, csrfToken, secret)
    try {
        const isVerify = csrfToken.verify(secret, token)
        console.log({ isVerify })
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid csrf token",
            error
        })
    }
}