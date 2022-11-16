import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dataSource } from './connection';
import authRoutes from './routes/auth';
import { initCsrfToken } from './middlewares/csrfToken';

dotenv.config();

const app: Express = express();

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER_URL}/${process.env.COLLECTION_NAME}?retryWrites=true&w=majority`)

dataSource.initialize().then(() => {
    console.log("Connected to mongodb")
})
.catch((err) => {
    console.error("Get errors while connected to mongoDB", err)
})

initCsrfToken()
app.use(cors({
    credentials: true
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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

app.use('/api', authRoutes);
// app.use('/api/category', categoryRoutes);

// app.use((req: Request, res: Response, next: NextFunction) => {
//     const error = new Error("Not Found");
//     res.status(404);
//     next(error)
// })

const port: number = Number(process.env.PORT) || 3001

app.listen(port, () => {
    console.log("Server has started on port " + port)
})