// 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
import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import { dataSource } from './connection';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
// import { initCsrfToken } from './middlewares/csrfToken';
import csrf from 'csurf';

dotenv.config();

const app: Express = express();

dataSource.initialize()
    .then(() => {
        console.log("Connected to mongodb")
    })
    .catch((err) => {
        console.error("Get errors while connected to mongoDB", err)
    })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// initCsrfToken()
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))
const csrfProtection = csrf();
app.use(cors({
    credentials: true
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

console.log('hi')

app.use('/api', authRoutes);
app.use(csrfProtection);
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('h', { 'session': req.session }, req.session.isLoggedIn, req.session.user)
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    console.log(req.session)
    if (!req.session.user) {
        return next();
    }
    // User.findById(req.session.user._id)
    //   .then(user => {
    // if (!user) {
    //   return next();
    // }
    // req.user = user;
    next();
    //   })
    //   .catch(err => {
    // next(new Error(err));
    //   });

});

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