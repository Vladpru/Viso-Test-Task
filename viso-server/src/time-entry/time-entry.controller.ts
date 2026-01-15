import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { TimeEntryService } from './time-entry.service';
import {
  TimeEntryDto,
  UpdateTimeEntryDto,
} from './dto/time-entry.dto';

@Controller('time-entry')
export class TimeEntryController {
  constructor(private readonly timeEntryService: TimeEntryService) {}

  @Get()
  async getAll() {
    return await this.timeEntryService.getAll();
  }

  @Post()
  async createTimeEntry(@Body() dto: TimeEntryDto) {
    return await this.timeEntryService.create(dto);
  }

  @Patch(':id')
  async updateTimeEntry(
    @Param('id') id: string,
    @Body() dto: UpdateTimeEntryDto
  ) {
    return await this.timeEntryService.update(id, dto);
  }

  @Delete(':id')
  async deleteTimeEntry(@Param('id') id: string) {
    return await this.deleteTimeEntry(id);
  }
}
