import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly _service: TaskService) { }

  @Get('')
  getUser() {
    return this._service.findAll();
  }

  @Post('')
  async create(@Body() user: Task) {
    return await this._service.create(user);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() user: Task) {
    return await this._service.update(id, user);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this._service.remove(id);
  }
}
