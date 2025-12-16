import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { Role } from '../common/enums';
import { Intervention } from '../interventions/interventions.entity';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  username!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.TECH,
  })
  role!: Role;
  @OneToMany(() => Intervention, intervention => intervention.technician)
  interventions!: Intervention[];
}
