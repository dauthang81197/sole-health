import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Enqueue a notification for delivery' })
  enqueue(@Body() dto: CreateNotificationDto) {
    return this.notificationsService.enqueue(dto);
  }
}
