import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Import module resolver own files
import { TaskStatus } from './entities/task-status.entity'
import { CreateTaskStatusInput } from './dto/create-task-status.input'
import { UpdateTaskStatusInput } from './dto/update-task-status.input'

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectRepository(TaskStatus)
    private readonly taskStatusRepository: Repository<TaskStatus>,
  ) {}

  async create(
    createTaskStatusInput: CreateTaskStatusInput,
  ): Promise<TaskStatus> {
    const taskStatus = new TaskStatus()
    Object.assign(taskStatus, createTaskStatusInput)

    return await this.taskStatusRepository.save(taskStatus)
  }

  async findAll(): Promise<TaskStatus[]> {
    return await this.taskStatusRepository.find()
  }

  async findOne(id: number): Promise<TaskStatus> {
    const taskStatisExists = await this.taskStatusRepository.findOneBy({ id })

    if (!taskStatisExists)
      throw new NotFoundException('Tasks status does not exist')

    return taskStatisExists
  }

  async update(id: number, updateTaskStatusInput: UpdateTaskStatusInput) {
    const taskStatusUpdate = await this.taskStatusRepository.findOneBy({ id })

    if (!taskStatusUpdate)
      throw new NotFoundException('Task status does not exist')

    delete updateTaskStatusInput.id
    Object.assign(taskStatusUpdate, updateTaskStatusInput)

    return this.taskStatusRepository.save(taskStatusUpdate)
  }

  remove(id: number) {
    return `This action removes a #${id} taskStatus`
  }
}
