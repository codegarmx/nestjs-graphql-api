import { Test, TestingModule } from '@nestjs/testing'
import { TaskStatusResolver } from './task-status.resolver'
import { TaskStatusService } from './task-status.service'

describe('TaskStatusResolver', () => {
  let resolver: TaskStatusResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskStatusResolver, TaskStatusService],
    }).compile()

    resolver = module.get<TaskStatusResolver>(TaskStatusResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
