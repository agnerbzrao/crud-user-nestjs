import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../enum/status.enum';

@Entity()
export class Costumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'costumer_name' })
  costumerName: string;

  @Column({ name: 'costumer_email' })
  costumerEmail: string;

  @Column({ name: 'costumer_image' })
  costumerImage: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: Status,
    default: Status.INACTIVE,
  })
  status: Status;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  deletedAt: Date;
}
