import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMentorDto } from '../modules/core/mentor/dto/create-mentor.dto';
import { CreateHeroDto } from '../modules/core/hero/dto/create-hero.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/mentor')
  async registerMentor(@Body() createMentorDto: CreateMentorDto) {
    return this.authService.registerMentor(createMentorDto);
  }

  @Post('register/hero')
  async registerHero(@Body() createHeroDto: CreateHeroDto) {
    return this.authService.registerHero(createHeroDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }
}
