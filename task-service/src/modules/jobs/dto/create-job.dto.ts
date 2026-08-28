import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({
    example: 'ping',
    description: 'Job type — routed to a handler in JobsProcessor',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ required: false, example: { foo: 'bar' } })
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}
