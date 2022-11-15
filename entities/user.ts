import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"

export type UserRoleType = "superAdmin" | "admin" | "agent"

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({
        type: "enum",
        enum: ["superAdmin", "admin", "agent"],
        default: "agent"
    })
    role: UserRoleType

    @Column()
    isActive: boolean
}