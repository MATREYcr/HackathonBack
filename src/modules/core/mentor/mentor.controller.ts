import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';

@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @Post()
  create(@Body() createMentorDto: CreateMentorDto) {
    return this.mentorService.createMentor(createMentorDto);
  }

  @Get()
  findAll() {
    return this.mentorService.findAllMentors();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mentorService.findOneMentorById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMentorDto: UpdateMentorDto) {
    return this.mentorService.updateMentor(+id, updateMentorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mentorService.removeMentor(+id);
  }
}
