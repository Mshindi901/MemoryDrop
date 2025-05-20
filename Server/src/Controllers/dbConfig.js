import {DataSource} from 'typeorm';
import "reflect-metadata";
import {User} from '../models/User.js'
import { Memories } from '../models/Memory.js';
import dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Yugah2005@",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [User, Memories]
});
export default AppDataSource;