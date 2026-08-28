import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

export class CreateNotificationDto {
  @ApiProperty({
    enum: NotificationChannel,
    example: NotificationChannel.EMAIL,
  })
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  recipient: string;

  @ApiProperty({ example: 'Your appointment is confirmed.' })
  @IsString()
  @MinLength(1)
  message: string;
}
