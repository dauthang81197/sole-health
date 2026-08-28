import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckDto {
  @ApiProperty({ example: 'ok' })
  status: string;

  @ApiProperty({ example: 'Service is healthy' })
  message: string;
}
