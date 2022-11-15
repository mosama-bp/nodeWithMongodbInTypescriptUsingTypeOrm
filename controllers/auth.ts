import { Request, Response, NextFunction } from 'express'
import { SECRET_KEY } from '../config'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
let User = { findOne: (e) => e, name:"mor" }

interface Credentials {
    email: string;
    password: any;
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
        const manager = getManager(); 
const result = await manager.findOne(Student, { id:1 });
        const user = await DataSource.manager.findOneBy(User, { email })
        if (!user) {
            return res.status(422).json({
                message: 'Invalid email'
            });
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
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            },
                SECRET_KEY,
                {
                    expiresIn: "7d"
                }
            );
            return res.status(200).json({
                message: "Login successfully",
                token
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
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.status(401).json({
                message: "E-Mail exists already, please try with a new one."
            })
        }
        // const bufferToken = crypto.randomBytes(32, (err, buffer) => {
        //     if (err) {
        //         return res.status(500).json({
        //             message: "Getting error while generating token"
        //         })
        //     }
        //     token = buffer.toString('hex');
        // })
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.save()
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