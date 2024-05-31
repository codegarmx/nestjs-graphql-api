import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field({ nullable: true })
  lastName?: string

  @Field()
  email: string
}
