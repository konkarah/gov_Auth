import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginLog } from 'src/entities/loginlog.entity';

@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLog)
    private loginLogRepository: Repository<LoginLog>,
  ) {}

  async logLoginAttempt(
    email: string, 
    status: 'success' | 'failed', 
    userId?: string, 
    ipAddress?: string
  ) {
    const loginLog = this.loginLogRepository.create({
      email,
      status,
      userId,
      ipAddress
    });

    return this.loginLogRepository.save(loginLog);
  }

  async getLoginStats(days: number = 30) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const successLogins = await this.loginLogRepository
      .createQueryBuilder('log')
      .select('DATE(log.timestamp)', 'date')
      .addSelect('COUNT(*)', 'count')
      .where('log.status = :status', { status: 'success' })
      .andWhere('log.timestamp BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    const failedLogins = await this.loginLogRepository
      .createQueryBuilder('log')
      .select('DATE(log.timestamp)', 'date')
      .addSelect('COUNT(*)', 'count')
      .where('log.status = :status', { status: 'failed' })
      .andWhere('log.timestamp BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    return {
      successLogins,
      failedLogins
    };
  }
}