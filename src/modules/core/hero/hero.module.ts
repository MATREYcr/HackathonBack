import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { MentorService } from 'src/modules/core/mentor/mentor.service';
import { Mentor } from 'src/modules/core/mentor/entities/mentor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hero, Mentor])],
  controllers: [HeroController],
  providers: [
    HeroService,
    MentorService
  ],
})
export class HeroModule {}
