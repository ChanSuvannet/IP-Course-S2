import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private _repo: Repository<Task>,
  ) { }

  async create(req: Partial<Task>) {
    const user = this._repo.create(req);
    return this._repo.save(user);
  }

  findAll() {
    return this._repo.find({ relations: ['tasks'] });
  }

  findOne(id: number) {
    return this._repo.findOne({ where: { id }, relations: ['tasks'] });
  }

  async update(id: number, req: Partial<Task>) {
    await this._repo.update(id, req);
    return this.findOne(id);
  }

  remove(id: number) {
    return this._repo.delete(id);
  }
}
