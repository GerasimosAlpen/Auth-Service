import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Pass12word' })
  @IsNotEmpty()
  password: string;
}
