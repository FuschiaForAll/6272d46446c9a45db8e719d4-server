import { ApolloError } from 'apollo-server'
import { ObjectId } from 'mongoose'
import { Arg, Ctx, Mutation, Query, Resolver, Int, PubSub, Publisher, Subscription, Field, Root, ObjectType } from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../types'
import { ObjectIdScalar } from '../utils/object-id.scalar'
import FilterParser from '../utils/filter-parser'
import { ToDo, ModelToDoConnection } from './ToDo.entity'
import { CreateToDoInput, UpdateToDoInput, DeleteToDoInput, ModelToDoConditionalInput, ModelToDoFilterInput } from './ToDo.input'
import { ToDoModel } from '../Models'
import { ModelSortDirection } from '../common.input'


@ObjectType()
class ToDoSubscriptionPayload {
  @Field()
  type!: "CREATE" | "DELETE" | "UPDATE";
  @Field((type) => [ObjectIdScalar])
  _ids!: ObjectId[];
  @Field((type) => [ToDo])
  items!: ToDo[];
}
  
@Service()
@Resolver(of => ToDo)
export class ToDoResolver {

  @Query(retuns => ToDo)
  async getToDo(@Arg('_id', type => ObjectIdScalar) _id: ObjectId) {
    return ToDoModel.findById(_id)
  }

  @Query(retuns => ModelToDoConnection)
  async listToDo(
    @Arg('filter', type => ModelToDoFilterInput, { nullable: true }) filter: ModelToDoFilterInput, 
    @Arg('sortDirection', type => ModelSortDirection, { nullable: true }) sortDirection: ModelSortDirection, 
    @Arg('limit', type => Int, { nullable: true }) limit: number, 
    @Arg('nextToken', { nullable: true }) nextToken: String, 
    @Ctx() ctx: Context) {
    const items = await ToDoModel.find(FilterParser()(filter) || {}).limit(limit || 0)
  return { nextToken: null, items }
  }

  @Mutation(returns => ToDo)
  async createToDo(
    @Arg('input', type => CreateToDoInput) input: CreateToDoInput, 
    @Arg('condition', type => ModelToDoConditionalInput, { nullable: true }) condition: ModelToDoConditionalInput,
    @PubSub("TODO_CHANGE") publish: Publisher<ToDoSubscriptionPayload>,
    @Ctx() ctx: Context) {
    const newItem = await ToDoModel.create({
      ...input,
    })
    publish({ type: 'CREATE', _ids: [newItem._id], items: [newItem] })
    return newItem
  }

  @Mutation(returns => ToDo, { nullable: true })
  async deleteToDo(
    @Arg('input', type => DeleteToDoInput) input: DeleteToDoInput, 
    @Arg('condition', type => ModelToDoConditionalInput, { nullable: true }) condition: ModelToDoConditionalInput,
    @PubSub("TODO_CHANGE") publish: Publisher<ToDoSubscriptionPayload>,
    @Ctx() ctx: Context) {
    const deletedItem = await ToDoModel.findByIdAndDelete(input._id)
    if(deletedItem) {
      publish({ type: 'DELETE', _ids: [deletedItem._id], items: [] })
      return deletedItem
    }
  }

  @Mutation(returns => ToDo, { nullable: true })
  async updateToDo(
    @Arg('input', type => UpdateToDoInput) input: UpdateToDoInput, 
    @Arg('condition', type => ModelToDoConditionalInput, { nullable: true }) condition: ModelToDoConditionalInput,
    @PubSub("TODO_CHANGE") publish: Publisher<ToDoSubscriptionPayload>,
    @Ctx() ctx: Context) {
    const updatedItem = await ToDoModel.findOneAndUpdate(FilterParser()(condition) || {}, 
    { 
      $set: {
        ...input,
    }}, { returnDocument: 'after' })
    if (updatedItem) {
      publish({ type: "UPDATE", _ids: [updatedItem._id], items: [updatedItem] })
      return updatedItem
    }
  }

  @Subscription(returns => ToDoSubscriptionPayload, {
    topics: "TODO_CHANGE"
  })
  async onToDoChange(
    @Root() ToDoSubscription: ToDoSubscriptionPayload,
    @Arg('filter', type => ModelToDoFilterInput, { nullable: true }) filter: ModelToDoFilterInput, 
    @Ctx() ctx: any) {
    return ToDoSubscription
  }
}