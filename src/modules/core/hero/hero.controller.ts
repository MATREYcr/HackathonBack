import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { BuyAwardsDto } from './dto/buyAwards.dto';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.createHero(createHeroDto);
  }

  @Get()
  findAll() {
    return this.heroService.findAllHeroes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroService.findOneHeroById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.updateHero(+id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.removeHero(+id);
  }

  @Get('statistics/:heroId')
  async getStadisticsByHeroId(@Param('heroId') heroId: number) {
    return this.heroService.getStadisticsByHeroId(heroId);
  }

  @Post('buyAwards')
  async buyAwardsByCrowns(@Body() buyAwardsDto: BuyAwardsDto) {
    return this.heroService.buyAwardsByCrowns(buyAwardsDto);
  }
}
