import {EntitySchema} from 'typeorm';
export const Family = new EntitySchema({
    name: "Family",
    tableName: 'family',
    columns: {
        id:{
            type: Number,
            primary: true,
            generated: true
        },
        name:{
            type: String,
        },
        description: {
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
            eager:  true
        },
        Album: {
            type: 'many-to-one',
            target: 'Album',
            joinColumn: {
                name: 'AlbumId'
            },
            eager: true
        }
    },
    members: {
      type: 'many-to-many',
      target: 'User',
      joinTable: {
        name: 'family_members', // this will be the join table name
        joinColumn: {
          name: 'familyId',
          referencedColumnName: 'id'
        },
        inverseJoinColumn: {
          name: 'userId',
          referencedColumnName: 'id'
        }
      },
      cascade: true,
      eager: false
    }
})