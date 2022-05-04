import { ObjectId } from 'mongoose'
import { ObjectType, Field } from 'type-graphql'
import { prop as Property } from '@typegoose/typegoose'
import { ObjectIdScalar } from '../utils/object-id.scalar'
import { Ref } from '../utils/ref-type'

@ObjectType()
export class ModelUserConnection {
  @Field(type => [User])
  items!: User[]
  @Field()
  nextToken!: string
}


@ObjectType()
export class User {
  @Field(type => ObjectIdScalar)
  readonly _id!: ObjectId;
  @Field(type => String, { nullable: false })
  @Property({ unique: true, nullable: false })
  email!: string
  @Property({ nullable: false })
  password!: string
}