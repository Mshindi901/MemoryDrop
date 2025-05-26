import {EntitySchema} from 'typeorm';
export const Album = new EntitySchema({
    name: "Album",
    tableName: 'album',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        name:{
            type: String
        },
        description:{
            type: String,
            nullable: true
        },
        createdAt:{
            type: 'timestamp',
            createDate: true
        }
    },
    relations:{
        User: {
            type: 'many-to-one',
            target: 'User',
            joinColumn:{
                name: 'createdBy'
            },
            eager: true
        },
        Memories: {
            type: 'one-to-many',
            target: 'Memories',
            joinColumn: {
                name: 'memories'
            },
            eager: true
        }
    }
})