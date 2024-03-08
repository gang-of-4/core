import { Controller, Query, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizeDto } from '../dto/authorize.dto';
import { AuthService } from '../services/auth.service';
import { plainToInstance } from 'class-transformer';

@Controller({
  version: '1',
  path: 'auth/authorize',
})
@ApiTags('Authorization')
export class AuthorizationController {
  constructor(private authService: AuthService) {}

  @Get('/')
  @ApiOkResponse()
  async authorize(@Query() authorizeDto: any) {
    authorizeDto = plainToInstance(AuthorizeDto, authorizeDto);

    const role = await this.authService.getUserRole(authorizeDto.access_token);

    const uri = authorizeDto.uri.replace(/^\/api\/v[0-9]+/, '');

    return await this.authService.authorize(uri, authorizeDto.method, role);
  }
}
