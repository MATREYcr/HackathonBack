import { Hero } from 'src/modules/core/hero/entities/hero.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Mentor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  awards?: string;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => Hero, (hero) => hero.mentor)
  heroes: Hero[];
}
