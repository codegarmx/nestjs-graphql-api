import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Import feature own files
import { User } from './model/user.model'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
