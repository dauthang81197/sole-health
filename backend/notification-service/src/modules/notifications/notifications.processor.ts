import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NOTIFICATIONS_QUEUE } from './notifications.constants';

/**
 * No real channel integration yet (SMTP/SMS/push provider) — that's deferred.
 * This proves the queue wiring end-to-end: enqueue via NotificationsService,
 * consume here.
 */
@Processor(NOTIFICATIONS_QUEUE)
export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name);

  process(job: Job<CreateNotificationDto>): Promise<void> {
    this.logger.log(
      `Would send ${job.data.channel} notification to ${job.data.recipient}: "${job.data.message}"`,
    );
    return Promise.resolve();
  }
}
