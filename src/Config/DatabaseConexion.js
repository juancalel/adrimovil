import pgPromise from "pg-promise";
import dotenv from "dotenv";

const pgp = pgPromise();
dotenv.config();

const dbConfig = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_ROOT_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: { rejectUnauthorized: true },
};

export const connection = pgp(dbConfig);
