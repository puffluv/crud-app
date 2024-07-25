export enum Status {
  CREATED = 'created',
  PROCESSING = 'processing',
  ABORTED = 'aborted',
  ERROR = 'error',
  DONE = 'done',
}

export interface ITask {
  id: string;
  task: string;
  status: Status;
  tags: string[];
  createdAt: Date;
  updateAt: Date;
}
