import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { User } from './model/user.model'
import { UsersService } from './users.service'

// Mock data
import { usersMock } from '@app/__mock__'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return usersMock.find((user) => user.id === id)
  }
}
