import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsInt, IsString } from 'class-validator';

@Entity()
export class LogsTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  crowns: number;

  @Column()
  @IsString()
  message: string;

  @Column()
  @IsInt()
  heroId: number;

  @CreateDateColumn()
  createdAt: Date;
}
