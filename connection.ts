import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    entities: ["entity/*.js"],
})