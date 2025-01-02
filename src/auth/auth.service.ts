import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { LoginLogService } from "./loginlog.service";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService,
    private loginLogService: LoginLogService
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (user) {
        const userPass = user.password;
        const isValid = await argon2.verify(userPass, password);

        if (!isValid) {
          // Log failed login attempt
          await this.loginLogService.logLoginAttempt(email, 'failed');
          return null;
        }

        // Log successful login
        await this.loginLogService.logLoginAttempt(email, 'success', user.id);
        return user;
      }

      // Log failed login attempt for non-existent user
      await this.loginLogService.logLoginAttempt(email, 'failed');
      return null;
    } catch (error) {
      // Log any unexpected errors during login attempt
      await this.loginLogService.logLoginAttempt(email, 'failed');
      return null;
    }
  }

  async login(user: any) {
    const { password, ...rest } = user;
    const payload = {
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      status: "success",
      msg: "User logged in successfully",
      data: {
        token: accessToken,
        userInfo: rest,
      },
    };
  }
}