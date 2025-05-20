import {EntitySchema} from 'typeorm';

export const Memories = new EntitySchema({
    name: "Memories",
    tableName: "memories",
    columns: {
        id:{
            type:Number,
            primary: true,
            generated: true
        },
        media:{
            type:String
        },
        description:{
            type:String
        }
    },
    relations: {
        User: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: {
                name: 'User.Id'
            },
            eager: true
        }
    }
});