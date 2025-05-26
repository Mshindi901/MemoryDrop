import {EntitySchema} from 'typeorm';
export const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id:{
            type: Number,
            primary: true,
            generated: true
        },
        username:{
            type: String,
            unique: true,
            nullable: false
        },
        email:{
            type:String,
            unique: true
        },
        password:{
            type:String
        }
    },
    relations: {
        families: {
            type: 'one-to-many',
            target: 'Family',
            inverseSide: 'User',
            eager: true
        }
    }
})