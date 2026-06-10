import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsLettersOnly } from '../validators/is-letters-only.validator';
import { IsValidEmailDomain } from '../validators/is-valid-email-domain.validator';
import { IsValidPassword } from '../validators/is-valid-password.validator';

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsLettersOnly()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsLettersOnly()
  last_name: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsValidEmailDomain()
  email: string;

  @ApiProperty({ example: 'Pass12word' })
  @IsNotEmpty()
  @IsValidPassword()
  password: string;
}
