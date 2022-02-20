import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './services/auth.service';
import { ERRORS } from './accounts.constants';

@Controller('accounts')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    // Log in the user
    const user = await this.authService.validateUser(loginDto);

    // If the user is null, the service couldn't log in
    if (!user) {
      // throw error
      throw new BadRequestException(ERRORS.invalidCredentialsError);
    }
    return this.authService.login(user);
  }
}
