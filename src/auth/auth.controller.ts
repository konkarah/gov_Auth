import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Public } from "./auth.set-metadata";
import { LoginLogService } from "./loginlog.service";

@Controller("api/auth")
export class AuthController {
	constructor(private authService: AuthService, private loginService: LoginLogService) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post("login")
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@Get()
	async logs(){
		return this.loginService.getLoginStats()
	}
}
