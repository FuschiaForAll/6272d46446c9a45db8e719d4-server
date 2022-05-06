import { Field, InputType } from 'type-graphql'
import { ObjectId } from 'mongoose'
import { ObjectIdScalar } from '../utils/object-id.scalar'
import { User } from './User.entity'
import { ModelStringInput } from '../common.input'

@InputType()
export class CreateUserInput {
  @Field({ nullable: undefined })
  undefined!: string
  @Field({ nullable: undefined })
  undefined!: string
}


@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  undefined?: string
  @Field({ nullable: true })
  undefined?: string
}


@InputType()
export class DeleteUserInput {
  @Field(type => ObjectIdScalar)
  _id!: ObjectId
}


@InputType()
export class ModelUserConditionalInput {
  @Field(type => ObjectIdScalar)
  _id!: ObjectId
  @Field(type => ModelStringInput, { nullable: true })
  undefined?: ModelStringInput
  @Field(type => ModelStringInput, { nullable: true })
  undefined?: ModelStringInput
  @Field(type => [ModelUserConditionalInput], { nullable: true })
  and?: ModelUserConditionalInput[]
  @Field(type => [ModelUserConditionalInput], { nullable: true })
  or?: ModelUserConditionalInput[]
  @Field(type => [ModelUserConditionalInput], { nullable: true })
  not?: ModelUserConditionalInput
}


@InputType()
export class ModelUserFilterInput {
  @Field(type => ObjectIdScalar, { nullable: true })
  _id!: ObjectId
  @Field(type => ModelStringInput, { nullable: true })
  undefined?: ModelStringInput
  @Field(type => ModelStringInput, { nullable: true })
  undefined?: ModelStringInput
  @Field(type => [ModelUserFilterInput], { nullable: true })
  and?: ModelUserFilterInput[]
  @Field(type => [ModelUserFilterInput], { nullable: true })
  or?: ModelUserFilterInput[]
  @Field(type => ModelUserFilterInput, { nullable: true })
  not?: ModelUserFilterInput
}