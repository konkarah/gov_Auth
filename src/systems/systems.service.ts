import { HttpException, Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { Systems as SystemsEntity } from '../entities/system.entity';
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
    return this.systemsRepository.save(userData);
  }

  async findAll(): Promise<SystemsEntity[]> {
    return this.systemsRepository.find();
  }

  async findOne(id: string): Promise<SystemsEntity> {
    const systemData = await this.systemsRepository.findOneBy({id})
    if(!systemData){
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return systemData;
  }

  update(id: number, updateSystemDto: UpdateSystemDto) {
    return `This action updates a #${id} system`;
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }
}
