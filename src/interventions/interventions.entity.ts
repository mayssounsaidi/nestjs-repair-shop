import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Device } from '../devices/devices.entity';
import { SparePart } from '../parts/spare-part.entity';

@Entity()
export class Intervention {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  date!: Date;

  @Column()
  description!: string;

 @ManyToOne(() => User, user => user.interventions)
technician!: User;


  @ManyToOne(() => Device, device => device.interventions)
  device!: Device;

  @ManyToMany(() => SparePart)
  @JoinTable()
  sparePart!: SparePart[];
}
