import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { System as SystemsEntity } from './entities/system.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SystemsService {

  constructor(
    @InjectRepository(SystemsEntity)
    private readonly systemsRepository: Repository<SystemsEntity>,
  ) {}
  async create(
    createSystemDto: CreateSystemDto,
  ): Promise<SystemsEntity> {
    const userData =
      await this.systemsRepository.create(
        createSystemDto,
      );
      console.log(userData)
    return this.systemsRepository.save(userData);
  }

  findAll() {
    return `This action returns all systems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} system`;
  }

  update(id: number, updateSystemDto: UpdateSystemDto) {
    return `This action updates a #${id} system`;
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }
}
