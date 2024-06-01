import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Module resolver own files
import { Task } from './entities/task.entity'
import { TasksService } from './tasks.service'
import { TasksResolver } from './tasks.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
