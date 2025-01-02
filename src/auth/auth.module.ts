import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "src/env";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { LoginLogService } from "./loginlog.service";
import { LoginLog } from "src/entities/loginlog.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [UserModule, PassportModule,TypeOrmModule.forFeature([LoginLog]), JwtModule.register({ secret: JWT_SECRET, signOptions: { expiresIn: "1h" } })],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy, LoginLogService],
})
export class AuthModule {}
