import { ITask, Status } from './task.interface';
import { v4 as uuidv4 } from 'uuid';

export class Task implements ITask {
  id: string = uuidv4();
  task: string;
  status: Status = Status.CREATED;
  tags: string[] = [];
  createdAt: Date = new Date();
  updateAt: Date = new Date();

  constructor(task: string, tags?: string[], status?: Status) {
    this.task = task;
    this.tags = tags;
    this.status = status;
  }
}
