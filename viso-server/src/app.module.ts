import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TimeEntryModule } from './time-entry/time-entry.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TimeEntryModule,
    ProjectModule,
  ],
})
export class AppModule {}
