import { Controller, All, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizeDto } from '../dto/authorize.dto';
import { AuthService } from '../services/auth.service';

@Controller({
  version: '1',
  path: 'auth/authorize',
})
@ApiTags('Authorization')
export class AuthorizationController {
  constructor(private authService: AuthService) {}

  @All('/')
  @ApiOkResponse()
  async authorize(@Query() authorizeDto: AuthorizeDto) {
    const role = await this.authService.getUserRole(authorizeDto.access_token);

    const uri = authorizeDto.uri.replace(/^\/api\/v[0-9]+/, '');

    return await this.authService.authorize(uri, authorizeDto.method, role);
  }
}
