import { ITask, Status } from './task.interface';

export class Task implements ITask {
  id = new Date().getTime();
  task: string;
  status: Status = Status.CREATED;
  tags: string[] = [];
  createdAt: Date = new Date();
  updateAt: Date = new Date();

  constructor(task: string) {
    this.task = task;
  }
}
