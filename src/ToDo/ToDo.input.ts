import { Field, InputType } from 'type-graphql'
import { ObjectId } from 'mongoose'
import { ObjectIdScalar } from '../utils/object-id.scalar'
import { ToDo } from './ToDo.entity'
import { ModelStringInput } from '../common.input'

@InputType()
export class CreateToDoInput {
  @Field({ nullable: true })
  Description?: string
}


@InputType()
export class UpdateToDoInput {
  @Field({ nullable: true })
  Description?: string
}


@InputType()
export class DeleteToDoInput {
  @Field(type => ObjectIdScalar)
  _id!: ObjectId
}


@InputType()
export class ModelToDoConditionalInput {
  @Field(type => ObjectIdScalar)
  _id!: ObjectId
  @Field(type => ModelStringInput, { nullable: true })
  Description?: ModelStringInput
  @Field(type => [ModelToDoConditionalInput], { nullable: true })
  and?: ModelToDoConditionalInput[]
  @Field(type => [ModelToDoConditionalInput], { nullable: true })
  or?: ModelToDoConditionalInput[]
  @Field(type => [ModelToDoConditionalInput], { nullable: true })
  not?: ModelToDoConditionalInput
}


@InputType()
export class ModelToDoFilterInput {
  @Field(type => ObjectIdScalar, { nullable: true })
  _id!: ObjectId
  @Field(type => ModelStringInput, { nullable: true })
  Description?: ModelStringInput
  @Field(type => [ModelToDoFilterInput], { nullable: true })
  and?: ModelToDoFilterInput[]
  @Field(type => [ModelToDoFilterInput], { nullable: true })
  or?: ModelToDoFilterInput[]
  @Field(type => ModelToDoFilterInput, { nullable: true })
  not?: ModelToDoFilterInput
}