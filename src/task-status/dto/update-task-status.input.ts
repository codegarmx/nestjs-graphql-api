import { IsNotEmpty, IsInt, IsPositive } from 'class-validator'
import { CreateTaskStatusInput } from './create-task-status.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateTaskStatusInput extends PartialType(CreateTaskStatusInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number
}
