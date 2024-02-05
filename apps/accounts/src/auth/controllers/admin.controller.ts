import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { AuthenticationDto } from '../dto/authentication.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthController } from './controller.interface';

@Controller({
  version: '1',
  path: 'auth/admin',
})
@ApiTags('Admin Auth')
export class AdminAuthController implements AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthenticationDto })
  async login(@Body() userLoginDto: UserLoginDto): Promise<AuthenticationDto> {
    const user = await this.authService.validateUserCredentials(userLoginDto);
    return this.authService.login(user);
  }
}
