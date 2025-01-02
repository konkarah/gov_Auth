import { Injectable } from '@nestjs/common';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Designations as DesignationsEntity } from 'src/entities/designations.entity';

@Injectable()
export class DesignationsService {
  constructor(
    @InjectRepository(DesignationsEntity)
    private readonly designationRepository: Repository<DesignationsEntity>,
  ) {}

  async create(
    createDesignationDto: CreateDesignationDto,
  ): Promise<DesignationsEntity> {
    const designationData =
      await this.designationRepository.create(
        createDesignationDto,
      );
    return this.designationRepository.save(designationData);
  }

  async findAll(): Promise<DesignationsEntity[]> {
    return this.designationRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} designation`;
  }

  update(id: number, updateDesignationDto: UpdateDesignationDto) {
    return `This action updates a #${id} designation`;
  }

  remove(id: number) {
    return `This action removes a #${id} designation`;
  }
}
