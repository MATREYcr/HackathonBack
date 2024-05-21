import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { Mentor } from './entities/mentor.entity';

@Injectable()
export class MentorService {
  constructor(
    @InjectRepository(Mentor)
    private mentorsRepository: Repository<Mentor>,
  ) {}

  async createMentor(createMentorDto: CreateMentorDto) {
    try {
      const newMentor = this.mentorsRepository.create(createMentorDto);
      return await this.mentorsRepository.save(newMentor);
    } catch (error) {
      console.error('Error creating Mentor', error);
      throw new HttpException('Error creating Mentor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllMentors() {
    try {
      return await this.mentorsRepository.find({ relations: ['heroes'] });
    } catch (error) {
      console.error('Error getting all Mentors', error);
      throw new HttpException('Error getting all Mentors', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneMentorById(id: number) {
    try {
      const mentorFound = await this.mentorsRepository.findOne({
        where: { id },
        relations: ['heroes'],
      });
      if (!mentorFound) {
        throw new HttpException('Mentor not found', HttpStatus.NOT_FOUND);
      }
      return mentorFound;
    } catch (error) {
      console.error('Error finding Mentor by ID', error);
      throw new HttpException('Error finding Mentor by ID', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneMentorByEmail(email: string) {
    try {
      const mentorFound = await this.mentorsRepository.findOne({
        where: { email },
        relations: ['heroes'],
      });
      if (!mentorFound) {
        throw new HttpException('Mentor not found', HttpStatus.NOT_FOUND);
      }
      return mentorFound;
    } catch (error) {
      console.error('Error finding Mentor by email', error);
      throw new HttpException('Error finding Mentor by email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateMentor(id: number, updateMentorDto: UpdateMentorDto) {
    try {
      const mentorFound = await this.findOneMentorById(id);
      if (!mentorFound) {
        throw new HttpException('Mentor not found', HttpStatus.NOT_FOUND);
      }

      const updatedMentor = Object.assign(mentorFound, updateMentorDto);
      return await this.mentorsRepository.save(updatedMentor);
    } catch (error) {
      console.error('Error updating Mentor', error);
      throw new HttpException('Error updating Mentor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeMentor(id: number) {
    try {
      const result = await this.mentorsRepository.delete({ id });
      if (result.affected === 0) {
        throw new HttpException('Mentor not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      console.error('Error deleting Mentor', error);
      throw new HttpException('Error deleting Mentor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
