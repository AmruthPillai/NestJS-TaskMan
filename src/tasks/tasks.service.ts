import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO, user);
  }

  async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.getTaskByID(id);
  }

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO, user);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);
    await this.taskRepository.delete(task);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id, status);
  }
}
