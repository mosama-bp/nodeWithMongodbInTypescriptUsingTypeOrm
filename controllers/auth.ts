import { Request, Response, NextFunction } from 'express'
import { SECRET_KEY } from '../config'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import { createCsrfToken } from '../middlewares/csrfToken'
import { dataSource } from '../connection'
import { User } from '../entities/user'

interface Credentials {
    email: string,
    password: any,
}

interface UserData {
    firstName: string,
    lastName: string,
    email: string,
    password: any
}

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: Credentials = req.body
        const userRepository = dataSource.getRepository(User)
        const user = await userRepository.findOneBy({ email })
        if (!user) {
            return res.status(422).json({
                message: 'Invalid email'
            })
        }
        const matchPass = await bcrypt.compare(password, user.password)
        if (!matchPass) {
            return res.status(422).json({
                message: "Wrong password"
            })
        }
        if (matchPass) {
            const token = jwt.sign({
                email: user.email,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            },
                SECRET_KEY,
                {
                    expiresIn: "7d"
                }
            )
            // console.log(req.csrfToken, req)
            req.session.isLoggedIn = true;
            req.session.user = user;
            // console.log("hi", req)
            // req.cookies.csrfToken = req.csrfToken()
            // console.log({req: req.session})
            // const csrfToken = createCsrfToken()
            return res.status(200).json({
                message: "Login successfully",
                token,
                // csrfToken
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Login failed",
            error
        })
    }
}

export const postRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password }: UserData = req.body
        const userRepository = dataSource.getRepository(User)
        const checkUser = await userRepository.findOneBy({ email })
        if (checkUser) {
            return res.status(401).json({
                message: "E-Mail exists already, please try with a new one."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User()
        user.firstName = firstName
        user.lastName = lastName
        user.email = email
        user.password = hashedPassword
        await userRepository.save(user)
        return res.status(200).json({
            message: "Successfully registered!"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong, please try again",
            error
        })
    }
}