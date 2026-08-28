import { Controller, Get } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Public } from '../../decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(private readonly i18n: I18nService) {}

  @Public()
  @Get()
  check() {
    return {
      status: 'ok',
      message: this.i18n.t('common.health.ok'),
    };
  }
}
