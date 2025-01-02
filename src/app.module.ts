import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SystemsModule } from './systems/systems.module';

import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { DesignationsModule } from './designations/designations.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get('typeorm'),
    }),
    UserModule,
    AuthModule,
    SystemsModule,
    RolesModule,
    DesignationsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
