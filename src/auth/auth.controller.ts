import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AccessTokenDTO } from './dto/access-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authService.signup(authCredentialsDTO);
  }

  @Post('login')
  login(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<AccessTokenDTO> {
    return this.authService.login(authCredentialsDTO);
  }
}
