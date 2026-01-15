import { Module } from '@nestjs/common';
import { TimeEntryService } from './time-entry.service';
import { TimeEntryController } from './time-entry.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TimeEntryController],
  providers: [TimeEntryService],
  imports: [PrismaModule],
})
export class TimeEntryModule {}
