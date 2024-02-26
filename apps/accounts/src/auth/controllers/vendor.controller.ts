import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { AuthenticationDto } from '../dto/authentication.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { RolesService } from '../../roles/services/roles.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from '../../roles/entities/role.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { AuthController } from './controller.interface';

@Controller({
  version: '1',
  path: 'auth/vendor',
})
@ApiTags('Vendor Auth')
export class VendorAuthController implements AuthController {
  vendorRole: Promise<RoleEntity>;

  constructor(
    private readonly authService: AuthService,
    private readonly rolesService: RolesService,
  ) {
    this.vendorRole = this.rolesService.findOneByName('vendor');
  }

  @Post('register')
  @ApiOkResponse({ type: UserEntity })
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return await this.authService.register(
      userRegisterDto,
      await this.vendorRole,
    );
  }

  @Post('login')
  @ApiOkResponse({ type: AuthenticationDto })
  async login(@Body() userLoginDto: UserLoginDto): Promise<AuthenticationDto> {
    const user = await this.authService.validateUserCredentials(userLoginDto);
    return this.authService.login(user);
  }
}
