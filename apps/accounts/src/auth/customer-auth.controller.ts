import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtTokenDto } from './dto/jwt-token.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { RolesService } from 'src/roles/services/roles.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller({
  version: '1',
  path: 'auth/customer',
})
@ApiTags('Customer Auth')
export class CustomerAuthController {
  customerRole: Promise<RoleEntity>;

  constructor(
    private readonly authService: AuthService,
    private readonly rolesService: RolesService,
  ) {
    this.customerRole = this.rolesService.findOneByName('customer');
  }

  @Post('register')
  @ApiOkResponse({ type: UserEntity })
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return await this.authService.register(
      userRegisterDto,
      await this.customerRole,
    );
  }

  @Post('login')
  @ApiOkResponse({ type: JwtTokenDto })
  async login(@Body() userLoginDto: UserLoginDto): Promise<JwtTokenDto> {
    const user = await this.authService.validateUserCredentials(userLoginDto);
    return this.authService.login(user);
  }
}
