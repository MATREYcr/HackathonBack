import { IsNumber, IsString } from 'class-validator';

export class BuyAwardsDto {
  @IsNumber()
  heroid: number;

  @IsNumber()
  numCrowns: number;

  @IsString()
  message: string;
}
