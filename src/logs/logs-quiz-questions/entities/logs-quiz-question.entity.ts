import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsInt, IsString, IsOptional } from 'class-validator';

@Entity()
export class LogsQuizQuestions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  signature: string;

  @Column()
  @IsInt()
  correctAnswer: number;

  @Column()
  @IsInt()
  wrongAnswer: number;

  @Column()
  @IsInt()
  crowns: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  message: string;

  @Column()
  @IsInt()
  heroId: number;

  @CreateDateColumn()
  createdAt: Date;
}
