import { DataSource } from "typeorm";
import {MONGO_USER, MONGO_PASSWORD, CLUSTER_URL, COLLECTION_NAME } from './config'

export const dataSource = new DataSource({
    type: "mongodb",
    url: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${CLUSTER_URL}/${COLLECTION_NAME}/?retryWrites=true"`,
    // url: "mongodb+srv://bitsproosama11:bitspro11lL$@cluster0.1lrztxu.mongodb.net/?retryWrites=true",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: ["entity/*.js"],
})