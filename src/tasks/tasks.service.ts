import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Module resolver own files
import { Task } from './entities/task.entity'
import { CreateTaskInput } from './dto/create-task.input'
import { UpdateTaskInput } from './dto/update-task.input'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const newTask = new Task()
    Object.assign(newTask, createTaskInput)

    return await this.taskRepository.save(newTask)
  }

  async findAll() {
    return await this.taskRepository.find()
  }

  async findOne(id: number): Promise<Task> {
    const taskFromDb = await this.taskRepository.findOneBy({ id })

    if (!taskFromDb) {
      throw new NotFoundException('Task not found')
    }

    return taskFromDb
  }

  async update(id: number, updateTaskInput: UpdateTaskInput) {
    // Check if task exists
    const updateTask = await this.taskRepository.findOneBy({ id })

    if (!updateTask) {
      throw new NotFoundException('Task not found')
    }

    delete updateTaskInput.id
    Object.assign(updateTask, updateTaskInput)

    return this.taskRepository.save(updateTask)
  }

  remove(id: number) {
    return `This action removes a #${id} task`
  }
}
