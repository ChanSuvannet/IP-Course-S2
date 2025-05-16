import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Get('')
  getUser() {
    return this.userService.findAll();
  }

  @Post('')
  async create(@Body() user: User) {
    return await this.userService.create(user);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() user: User) {
    return await this.userService.update(id, user);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
