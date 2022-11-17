import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    text: string

    @Column()
    description: string

    // @Column()
    // postBy: string

    @Column({
        default: false
    })
    isDeleted: boolean
}