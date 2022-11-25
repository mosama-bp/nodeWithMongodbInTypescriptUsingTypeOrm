// 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
import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import { dataSource } from './connection';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import csrf from 'csurf';

dotenv.config();

const app: Express = express();

const csrfProtection = csrf()

app.use(cors({
    credentials: true
}))

dataSource.initialize()
    .then(() => {
        console.log("Connected to mongodb")
    })
    .catch((err) => {
        console.error("Get errors while connected to mongoDB", err)
    })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

app.use('/api', authRoutes)
app.use(csrfProtection);
app.use((req: Request, res: Response, next: NextFunction) => {
    // console.log(req.session, req.csrfToken(), 'k')
    res.locals.isAuthenticated = req.session.isLoggedIn;
    // res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    console.log(req.session, req.csrfToken(), req.csrftoken)
    if (!req.session.user && !req.session.isLoggedIn) {
        return res.status(500).json({
            message: "Something went wrong!",
            isLogin: req.session.isLoggedIn ? true : false
        })
    }
    next()
})

app.use('/api/post', postRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not Found");
    res.status(404);
    next(error)
})

const port: number = Number(process.env.PORT) || 3001

app.listen(port, () => {
    console.log("Server has started on port " + port)
})