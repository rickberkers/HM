import {Connection, createConnection} from 'typeorm';
import {join} from "path";

export default class Database {
    public static connect(): Promise<Connection> {
        let { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
        return createConnection({
            name: 'default',
            type: DB_TYPE as any,
            host: DB_HOST,
            port: DB_PORT as any,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            entities: [join(__dirname, '**', `entities/*.{ts,js}`)],
            synchronize: true
        });
    }
}