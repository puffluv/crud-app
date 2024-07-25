import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ITask } from './task.interface';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(): ITask[] {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTaskbyId(@Param('id') id: string): ITask {
    return this.taskService.getTaskbyId(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createTask(@Body() task: CreateTaskDto): ITask {
    return this.taskService.createTask(task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): { message: string } {
    return this.taskService.deleteTask(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): ITask {
    return this.taskService.updateTask(id, updateTaskDto);
  }
}
