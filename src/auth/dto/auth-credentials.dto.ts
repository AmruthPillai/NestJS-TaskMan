import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(48)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(48)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak to be accepted',
  })
  password: string;
}
