import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './entities/hero.entity';
import { MentorService } from '../mentor/mentor.service';
import { BuyAwardsDto } from './dto/buyAwards.dto';
import { LogsQuizQuestionsService } from 'src/logs/logs-quiz-questions/logs-quiz-questions.service';
import { LogsTransactionService } from 'src/logs/logs-transaction/logs-transaction.service';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private heroesRepository: Repository<Hero>,
    private readonly mentorsService: MentorService,
    private readonly logsQuizQuestionsService: LogsQuizQuestionsService,
    private readonly logsTransactionService: LogsTransactionService,
  ) { }

  async createHero(createHeroDto: CreateHeroDto) {
    try {
      const mentor = await this.mentorsService.findOneMentorById(createHeroDto.mentorId);
      if (!mentor) {
        throw new HttpException('Mentor not found', HttpStatus.NOT_FOUND);
      }

      const newHero = this.heroesRepository.create({
        ...createHeroDto,
        mentor,
      });
      return await this.heroesRepository.save(newHero);
    } catch (error) {
      console.error('Error creating Hero', error);
      throw error;
    }
  }

  async findAllHeroes() {
    try {
      return await this.heroesRepository.find({ relations: ['mentor'] });
    } catch (error) {
      console.error('Error getting all Heroes', error);
      throw new HttpException('Error getting all Heroes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneHeroById(id: number) {
    try {
      const heroFound = await this.heroesRepository.findOne({
        where: { id },
        relations: ['mentor'],
      });
      if (!heroFound) {
        throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
      }
      return heroFound;
    } catch (error) {
      console.error('Error finding Hero by ID', error);
      throw error;
    }
  }

  async findOneHeroByEmail(email: string) {
    try {
      const heroFound = await this.heroesRepository.findOne({
        where: { email },
        relations: ['mentor'],
      });
      if (!heroFound) {
        throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
      }
      return heroFound;
    } catch (error) {
      console.error('Error finding Hero by email', error);
      throw error;
    }
  }

  async updateHero(id: number, updateHeroDto: UpdateHeroDto) {
    try {
      const heroFound = await this.findOneHeroById(id);
      if (!heroFound) {
        throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
      }

      const updatedHero = Object.assign(heroFound, updateHeroDto);
      return await this.heroesRepository.save(updatedHero);
    } catch (error) {
      console.error('Error updating Hero', error);
      throw error;
    }
  }

  async buyAwardsByCrowns({ heroid, numCrowns, message }: BuyAwardsDto) {
    try {
      const heroFound = await this.findOneHeroById(heroid);
      if (!heroFound) {
        throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
      }
      const actualCrowns = heroFound.crowns;
      if (actualCrowns < numCrowns) {
        throw new HttpException('Ups!, Coronas insuficientes', HttpStatus.NOT_FOUND);
      }
      const calculateCrowns = actualCrowns - numCrowns;
      await this.updateHero(heroid, { crowns: calculateCrowns })
      const newHeroFound = await this.findOneHeroById(heroid);
      //SaveLog
      await this.logsTransactionService.create({
        heroId: heroid,
        crowns: numCrowns,
        message,
      })
      return newHeroFound;
    } catch (error) {
      console.error('Error Failed Buy', error);
      throw error;
    }
  }

  async removeHero(id: number) {
    try {
      const result = await this.heroesRepository.delete({ id });
      if (result.affected === 0) {
        throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      console.error('Error deleting Hero', error);
      throw error;
    }
  }

  async getStadisticsByHeroId(heroId: number) {
    try {
      const hero = await this.heroesRepository.findOne({ where: { id: heroId } });
      if (!hero) {
        throw new Error('Hero not found');
      }
      const getStadisticsByLogs = await this.logsQuizQuestionsService.getQuestionsStatisticsByHeroId(heroId);

      return { crowns: hero.crowns, ...getStadisticsByLogs };
    } catch (error) {
      console.error('Error deleting Hero', error);
      throw error;
    }

  }

}
