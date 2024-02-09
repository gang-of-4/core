import { UserLoginDto } from '../dto/user-login.dto';
import { AuthenticationDto } from '../dto/authentication.dto';

export interface AuthController {
  login(userLoginDto: UserLoginDto): Promise<AuthenticationDto>;
}
