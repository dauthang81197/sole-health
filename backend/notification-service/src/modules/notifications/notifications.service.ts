import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NOTIFICATIONS_QUEUE } from './notifications.constants';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue(NOTIFICATIONS_QUEUE) private readonly queue: Queue,
  ) {}

  async enqueue(dto: CreateNotificationDto) {
    const job = await this.queue.add('send', dto);
    return { jobId: job.id };
  }
}
