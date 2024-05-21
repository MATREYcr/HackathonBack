// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MentorService } from '../mentor/mentor.service';
import { HeroService } from '../hero/hero.service';
import { CreateMentorDto } from '../mentor/dto/create-mentor.dto';
import { CreateHeroDto } from '../hero/dto/create-hero.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly mentorService: MentorService,
    private readonly heroService: HeroService,
  ) {}

  async registerMentor(createMentorDto: CreateMentorDto) {
    const { password } = createMentorDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.mentorService.createMentor({
      ...createMentorDto,
      password: hashedPassword,
    });
  }

  async registerHero(createHeroDto: CreateHeroDto) {
    const { password } = createHeroDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.heroService.createHero({
      ...createHeroDto,
      password: hashedPassword,
    });
  }
  async login(loginUserDto: LoginUserDto) {
    const { email, password, userType } = loginUserDto;
    
    if (userType === 'MENTOR') {
      const mentor = await this.mentorService.findOneMentorByEmail(email);
      if (mentor && await bcrypt.compare(password, mentor.password)) {
        return mentor;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } else if (userType === 'HERO') {
      const hero = await this.heroService.findOneHeroByEmail(email);
      if (hero && await bcrypt.compare(password, hero.password)) {
        return hero;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } else {
      throw new UnauthorizedException('Invalid user type');
    }
  }
}
