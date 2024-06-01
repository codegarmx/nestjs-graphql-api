import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, MinLength } from 'class-validator'

@InputType()
export class CreateTaskStatusInput {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  name: string
}
