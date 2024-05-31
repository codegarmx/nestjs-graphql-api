import { Resolver, Query } from '@nestjs/graphql'
import { User } from './model/user.model'
import { UsersService } from './users.service'

// Mock data
import { usersMock } from '@app/__mock__'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async getUser() {
    return usersMock[0]
  }
}
