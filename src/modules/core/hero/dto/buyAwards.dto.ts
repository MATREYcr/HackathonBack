import { IsNumber } from 'class-validator';

export class BuyAwardsDto {
  @IsNumber()
  heroid: number;

  @IsNumber()
  numCrowns: number;
}
