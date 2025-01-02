import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles as RolesEntity } from 'src/entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}

  async create(
    createRoleDto: CreateRoleDto,
  ): Promise<RolesEntity> {
    const rolesData =
      await this.rolesRepository.create(
        createRoleDto,
      );
    return this.rolesRepository.save(rolesData);
  }
  async findAll(): Promise<RolesEntity[]> {
    return this.rolesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
