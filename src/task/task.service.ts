import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask } from './task.interface';
import { Task } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [];

  getTasks(): ITask[] {
    return this.tasks;
  }

  getTaskbyId(id: string): ITask {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  createTask({ task, tags, status }: CreateTaskDto): ITask {
    const newTask = new Task(task, tags, status);
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: string): { message: string } {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
    return { message: `Task with id ${id} has been deleted` };
  }

  updateTask(id: string, updatedTask: UpdateTaskDto): ITask {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    const task = this.tasks[taskIndex];

    if (updatedTask.task) task.task = updatedTask.task;
    if (updatedTask.tags) task.tags = updatedTask.tags;
    if (updatedTask.status) task.status = updatedTask.status;
    task.updateAt = new Date();
    this.tasks[taskIndex] = task;

    return task;
  }
}
