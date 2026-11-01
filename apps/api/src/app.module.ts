import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { TelegramModule } from './modules/telegram/telegram.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { EducationModule } from './modules/education/education.module';
import { SkillsModule } from './modules/skills/skills.module';
import { CertificationsModule } from './modules/certifications/certifications.module';
import { ServicesModule } from './modules/services/services.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ContactModule } from './modules/contact/contact.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://127.0.0.1:27017/rishu_universe',
      }),
      inject: [ConfigService],
    }),
    TelegramModule,
    AuthModule,
    ProfileModule,
    ProjectsModule,
    ExperienceModule,
    EducationModule,
    SkillsModule,
    CertificationsModule,
    ServicesModule,
    BookingsModule,
    PaymentsModule,
    ContactModule,
    SettingsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
