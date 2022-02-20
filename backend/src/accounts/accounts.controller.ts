import { Controller, Post, Body } from '@nestjs/common';
import {UsersService, LoginService} from './accounts.service';
import { LoginDto } from './dto/login.dto';
import {ethers} from "ethers";
import {log} from "util";

@Controller('accounts')
export class LoginController {
  constructor(
      private readonly loginService: LoginService,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    // Log in the user
    const user = this.loginService.login(loginDto);

    // If the user is null, the service couldn't log in
    if(!user) {
      // Return error
      return
    }

  }

}
