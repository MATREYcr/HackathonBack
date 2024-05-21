import { IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateMentorDto {
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username must be no more than 20 characters long' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsOptional()
  @IsString()
  awards?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
