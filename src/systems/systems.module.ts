import { Module } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { SystemsController } from './systems.controller';
import { Systems } from '../entities/system.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Systems]),
  ],
  controllers: [SystemsController],
  providers: [SystemsService],
})
export class SystemsModule {}
