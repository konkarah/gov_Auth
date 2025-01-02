import { Module } from '@nestjs/common';
import { DesignationsService } from './designations.service';
import { DesignationsController } from './designations.controller';
import { Designations } from 'src/entities/designations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Designations]),
  ],
  controllers: [DesignationsController],
  providers: [DesignationsService],
})
export class DesignationsModule {}
