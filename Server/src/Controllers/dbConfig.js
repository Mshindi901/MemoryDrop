import {DataSource} from 'typeorm';
import "reflect-metadata";
import {User} from '../models/User.js'
import { Memories } from '../models/Memory.js';
import { Album } from '../models/Album.js';
import { Family } from '../models/Family.js';
import dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgresql://memory_drop_db_user:bDGELvXGq09hCBV0N7tu5YYkUk72oP8J@dpg-d0m5bp95pdvs738u5ng0-a/memory_drop_db",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Yugah2005@",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [User, Memories, Album, Family]
});
export default AppDataSource;
