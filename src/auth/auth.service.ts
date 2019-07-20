import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDTO } from './dto/jwt-payload.dto';
import { AccessTokenDTO } from './dto/access-token.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(authCredentialsDTO: AuthCredentialsDTO): Promise<AccessTokenDTO> {
    const username = await this.userRepository.login(authCredentialsDTO);

    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayloadDTO = { username };
    const accessToken = await this.jwtService.signAsync(payload);

    this.logger.debug(`Generated JSON Web Token for user "${username}"`);

    return { accessToken };
  }

  async signup(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signup(authCredentialsDTO);
  }
}
