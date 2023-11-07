import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class Auth {
  @ApiProperty({ minLength: 2, maxLength: 30, example: 'admin1202' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  username: string;

  @ApiProperty({ minLength: 8, maxLength: 20, example: '9@Lz$GvYp1Qs' })
  @IsNotEmpty()
  password: string;
}
