import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask } from './task.interface';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [
    { id: 1, task: 'task 1' },
    { id: 2, task: 'task 2' },
  ];

  getTasks(): ITask[] {
    return this.tasks;
  }

  getTaskbyId(id: string): ITask {
    const task = this.tasks.find((t) => t.id === +id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  createTask(task: ITask): ITask {
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): { message: string } {
    const taskIndex = this.tasks.findIndex((t) => t.id === +id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
    return { message: `Task with id ${id} has been deleted` };
  }

  updateTask(id: string, updatedTask: ITask): ITask {
    const taskIndex = this.tasks.findIndex((t) => t.id === +id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    const task = this.tasks[taskIndex];
    task.task = updatedTask.task;
    this.tasks[taskIndex] = task;
    return task;
  }
}
