import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql'
import { TasksService } from './tasks.service'
import { Task } from './entities/task.entity'
import { CreateTaskInput } from './dto/create-task.input'
import { UpdateTaskInput } from './dto/update-task.input'

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task], { name: 'tasks', nullable: 'items' })
  async getAllTasks() {
    return await this.tasksService.findAll()
  }

  @Query(() => Task, { name: 'task' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.tasksService.findOne(id)
  }

  @Mutation(() => Task)
  async createTask(@Args('createTaskInput') createTasksInput: CreateTaskInput) {
    return this.tasksService.create(createTasksInput)
  }

  @Mutation(() => Task)
  async updateTask(@Args('payload') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput)
  }

  /*@Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput)
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput)
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.remove(id)
  }*/
}
