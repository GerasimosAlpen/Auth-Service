import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  email: string;

  @ApiProperty({ example: 'CUSTOMER' })
  role: string;
}

export class ProfileResponseDto {
  @ApiProperty({ example: 'Profile retrieved successfully' })
  message: string;

  @ApiProperty({ type: UserProfileDto })
  user: UserProfileDto;
}
