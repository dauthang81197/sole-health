import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { Public } from '../../decorators/public.decorator';
import { HealthCheckDto } from './dto/health-check.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly i18n: I18nService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Liveness check' })
  @ApiOkResponse({ type: HealthCheckDto })
  check(): HealthCheckDto {
    return {
      status: 'ok',
      message: this.i18n.t('common.health.ok'),
    };
  }
}
