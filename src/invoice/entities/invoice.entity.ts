import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaidStatus } from '../enums/paid.enum';
import { User } from '../../auth/entities/user.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dueDate: Date;

  @Column()
  term: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column({
    nullable: true,
    type: 'enum',
    default: PaidStatus.PENDING,
    enum: PaidStatus,
  })
  status: PaidStatus;

  @ManyToOne(() => User, (user) => user.invoices)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
