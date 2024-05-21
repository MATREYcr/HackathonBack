// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MentorService } from '../mentor/mentor.service';
import { HeroService } from '../hero/hero.service';
import { Mentor } from 'src/mentor/entities/mentor.entity';
import { Hero } from 'src/hero/entities/hero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mentor, Hero])],
  controllers: [AuthController],
  providers: [AuthService, MentorService, HeroService],
})
export class AuthModule {}
