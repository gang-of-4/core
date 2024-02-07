import { UserLoginDto } from '../dto/user-login.dto';
import { JwtTokenDto } from '../dto/jwt-token.dto';

export interface AuthController {
  login(userLoginDto: UserLoginDto): Promise<JwtTokenDto>;
}
