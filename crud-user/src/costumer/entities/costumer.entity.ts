import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Costumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  costumerName: string;

  @Column('int')
  costumerAge: number;

  @Column()
  costumerImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
