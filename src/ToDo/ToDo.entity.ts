import { ObjectId } from 'mongoose'
import { ObjectType, Field } from 'type-graphql'
import { prop as Property } from '@typegoose/typegoose'
import { ObjectIdScalar } from '../utils/object-id.scalar'
import { Ref } from '../utils/ref-type'

@ObjectType()
export class ModelToDoConnection {
  @Field(type => [ToDo])
  items!: ToDo[]
  @Field()
  nextToken!: string
}


@ObjectType()
export class ToDo {
  @Field(type => ObjectIdScalar)
  readonly _id!: ObjectId;
  @Field(type => String, { nullable: true })
  @Property({ nullable: true })
  Description!: string
}