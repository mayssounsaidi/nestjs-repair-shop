import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DeviceGrade, DeviceStatus } from '../common/enums';
import { Intervention } from '../interventions/interventions.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  serialNumber!: string;

  @Column()
  brand!: string;

  @Column()
  model!: string;

  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.PENDING,
  })
  status!: DeviceStatus;

  @Column({
    type: 'enum',
    enum: DeviceGrade,
    default: DeviceGrade.NONE,
  })
  grade!: DeviceGrade;

  @OneToMany(() => Intervention, intervention => intervention.device)
  interventions!: Intervention[];
}
