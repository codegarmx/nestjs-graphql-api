import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Module resolver own files
import { TaskStatus } from './entities/task-status.entity'
import { TaskStatusService } from './task-status.service'
import { TaskStatusResolver } from './task-status.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus])],
  providers: [TaskStatusResolver, TaskStatusService],
})
export class TaskStatusModule {}
