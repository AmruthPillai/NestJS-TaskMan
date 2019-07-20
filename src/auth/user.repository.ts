import { Repository, EntityRepository } from 'typeorm';

import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }
}
