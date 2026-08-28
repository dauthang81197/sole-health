import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { CreateJobDto } from './dto/create-job.dto';
import { JOBS_QUEUE } from './jobs.constants';

@Injectable()
export class JobsService {
  constructor(@InjectQueue(JOBS_QUEUE) private readonly queue: Queue) {}

  async enqueue(dto: CreateJobDto) {
    const job = await this.queue.add(dto.name, dto.payload ?? {});
    return { jobId: job.id };
  }
}
