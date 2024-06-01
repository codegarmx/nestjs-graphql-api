import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator'

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty()
  @MinLength(5)
  name: string

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(10)
  description?: string
}
