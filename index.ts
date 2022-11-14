import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// const mongoose = require('mongoose');

dotenv.config();

const app: Express = express();

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER_URL}/${process.env.COLLECTION_NAME}?retryWrites=true&w=majority`)

// mongoose.Promise = global.Promise;

// const db = mongoose.connection;
// db.once('open', () => {
//     console.log("Connected to mongoDB")
// })

// db.on('error', () => {
//     console.log("Get errors while connected to mongoDB");
// })

app.use(cors({
    credentials: true
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const authRoutes = require('./routes/auth');
// const categoryRoutes = require('./routes/category');

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

// app.use('/api', authRoutes);
// app.use('/api/category', categoryRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not Found");
    res.status(404);
    next(error)
})

const port: number =  Number(process.env.PORT) || 3001

app.listen(port, () => {
    console.log("Server has started on port " + port)
})