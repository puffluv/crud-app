import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ITask } from './task.interface';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private testService: TaskService) {}

  @Get()
  getTasks(): ITask[] {
    return this.testService.getTasks();
  }

  @Get(':id')
  getTaskbyId(@Param('id') id: string): ITask {
    return this.testService.getTaskbyId(id);
  }

  @Post()
  createTask(@Body('task') task: ITask): ITask {
    return this.testService.createTask(task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): { message: string } {
    return this.testService.deleteTask(id);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updatedTask: ITask): ITask {
    return this.testService.updateTask(id, updatedTask);
  }
}
