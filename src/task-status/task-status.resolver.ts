import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { TaskStatusService } from './task-status.service'
import { TaskStatus } from './entities/task-status.entity'
import { CreateTaskStatusInput } from './dto/create-task-status.input'
import { UpdateTaskStatusInput } from './dto/update-task-status.input'

@Resolver(() => TaskStatus)
export class TaskStatusResolver {
  constructor(private readonly taskStatusService: TaskStatusService) {}

  @Mutation(() => TaskStatus)
  async createTaskStatus(
    @Args('payload') createTaskStatusInput: CreateTaskStatusInput,
  ) {
    return await this.taskStatusService.create(createTaskStatusInput)
  }

  @Query(() => [TaskStatus], { name: 'taskStatuses', nullable: 'items' })
  async findAll() {
    return this.taskStatusService.findAll()
  }

  @Query(() => TaskStatus, { name: 'taskStatus' })
  async findOne(
    @Args('id', { name: 'taskStatus', type: () => Int }) id: number,
  ) {
    return await this.taskStatusService.findOne(id)
  }

  @Mutation(() => TaskStatus)
  async updateTaskStatus(
    @Args('payload') updateTaskStatusInput: UpdateTaskStatusInput,
  ) {
    return await this.taskStatusService.update(
      updateTaskStatusInput.id,
      updateTaskStatusInput,
    )
  }

  @Mutation(() => TaskStatus)
  removeTaskStatus(@Args('id', { type: () => Int }) id: number) {
    return this.taskStatusService.remove(id)
  }
}
