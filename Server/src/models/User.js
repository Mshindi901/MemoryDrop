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
            type: String
        },
        email:{
            type:String,
            unique: true
        },
        password:{
            type:String
        }
    }
})