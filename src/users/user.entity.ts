import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum Role {
  ADMIN = 'ADMIN',
  TECH = 'TECH',
}

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

  @Column({ type: 'enum', enum: Role, default: Role.TECH })
  role!: Role;

 
}
