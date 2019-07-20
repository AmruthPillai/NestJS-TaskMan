import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async login(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
    const username = await this.userRepository.login(authCredentialsDTO);

    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return username;
  }

  async signup(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signup(authCredentialsDTO);
  }
}
