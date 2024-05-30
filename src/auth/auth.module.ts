import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MentorService } from '../modules/core/mentor/mentor.service';
import { HeroService } from '../modules/core/hero/hero.service';
import { Mentor } from 'src/modules/core/mentor/entities/mentor.entity';
import { Hero } from 'src/modules/core/hero/entities/hero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mentor, Hero])],
  controllers: [AuthController],
  providers: [AuthService, MentorService, HeroService],
})
export class AuthModule {}
