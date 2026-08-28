import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JOBS_QUEUE } from './jobs.constants';
import { JobsProcessor } from './jobs.processor';
import { JobsService } from './jobs.service';

@Module({
  imports: [BullModule.registerQueue({ name: JOBS_QUEUE })],
  controllers: [JobsController],
  providers: [JobsService, JobsProcessor],
})
export class JobsModule {}
