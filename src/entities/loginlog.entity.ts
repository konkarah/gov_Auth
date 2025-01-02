import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('login_logs')
export class LoginLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  status: 'success' | 'failed';

  @Column({ nullable: true })
  userId?: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ nullable: true })
  ipAddress?: string;
}