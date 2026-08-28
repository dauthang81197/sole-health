import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Enqueue a background job' })
  enqueue(@Body() dto: CreateJobDto) {
    return this.jobsService.enqueue(dto);
  }
}
