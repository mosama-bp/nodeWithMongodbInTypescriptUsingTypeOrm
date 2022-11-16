import { Request, Response, NextFunction, Router } from 'express'
import { body, check, validationResult } from 'express-validator'
import { postLogin, postRegister } from '../controllers/auth'

const router = Router()

router.post('/login',
    check("email", "email is required!")
        .notEmpty(),
    check("password", "password is required!")
        .notEmpty(),
    body('email').isEmail().withMessage({
        message: 'Not an email',
    }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next()
    },
    postLogin);

router.post('/register',
    check("email", "email is required!")
        .notEmpty(),
    check("password", "password is required!")
        .notEmpty(),
    check("firstName", "firstName is required!")
        .notEmpty(),
    check("lastName", "lastName is required!")
        .notEmpty(),
    body('email').isEmail().withMessage({
        message: 'Not an email',
    }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next()
    },
    postRegister);

export default router