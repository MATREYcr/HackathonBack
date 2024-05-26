import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsString, MaxLength } from 'class-validator';

@Entity()
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @IsString()
  @MaxLength(255)
  signature: string;

  @Column('int')
  @IsInt()
  difficulty: number;

  @Column('text')
  @IsString()
  questionText: string;
}
