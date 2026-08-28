import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { JOBS_QUEUE } from './jobs.constants';

/**
 * Generic worker for background jobs enqueued by any service. Only handles
 * the demo "ping" job type — add a case per real job name as they're built.
 */
@Processor(JOBS_QUEUE)
export class JobsProcessor extends WorkerHost {
  private readonly logger = new Logger(JobsProcessor.name);

  process(job: Job): Promise<unknown> {
    switch (job.name) {
      case 'ping':
        this.logger.log(`Handled ping job ${job.id}`);
        return Promise.resolve({ pong: true });
      default:
        this.logger.warn(`No handler for job "${job.name}" (${job.id})`);
        return Promise.resolve(null);
    }
  }
}
