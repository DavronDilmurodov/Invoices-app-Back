import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TermEnum } from '../enums/term.enum';

export class CreateInvoiceDto {
  @ApiProperty({ minLength: 2, maxLength: 15, example: 'alex' })
  @IsString()
  @Length(2, 15)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'alex@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '2023-11-02T17:21:06.564Z' })
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => {
    try {
      return new Date(value);
    } catch (error) {
      return value;
    }
  })
  dueDate: Date;

  @ApiProperty({ name: 'term', enum: TermEnum })
  @IsNotEmpty()
  @IsEnum(TermEnum)
  term: TermEnum;

  @ApiProperty({ maxLength: 80 })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  description: string;

  @ApiProperty({ minimum: 100, maximum: 700, example: 500 })
  @IsInt()
  @Min(100)
  @Max(700)
  @IsNotEmpty()
  price: number;
}
