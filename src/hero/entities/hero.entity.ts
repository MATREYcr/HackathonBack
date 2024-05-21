import { Mentor } from 'src/mentor/entities/mentor.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  rol: string;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => Mentor, (mentor) => mentor.heroes, { nullable: false, onDelete: 'CASCADE' })
  mentor: Mentor;
}
