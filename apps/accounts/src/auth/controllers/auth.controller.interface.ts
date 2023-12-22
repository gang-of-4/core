import { UserLoginDto } from '../dto/user-login.dto';
import { JwtTokenDto } from '../dto/jwt-token.dto';
import { RoleEntity } from '../../roles/entities/role.entity';


export interface AuthController {
  login(userLoginDto: UserLoginDto): Promise<JwtTokenDto>
}
