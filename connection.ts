import { DataSource } from "typeorm";
import {MONGO_USER, MONGO_PASSWORD, CLUSTER_URL } from './config'
import { Post } from "./entities/post";
import { User } from "./entities/user";

export const dataSource = new DataSource({
    type: "mongodb",
    url: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${CLUSTER_URL}/?retryWrites=true"`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [User, Post],
})