import {
  IsDate,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
export class TimeEntryDto {
  @Type(() => Date) // Трансформація з JSON в Date
  @IsDate({
    message: 'Date is required',
  })
  date: Date;

  @IsNumber(
    {},
    {
      message: 'Hours is required',
    }
  )
  @Min(0, {
    message: 'Hours cannot be negative',
  })
  @Max(24, {
    message: 'Hours cannot exceed 24',
  })
  hours: number;

  @IsString({
    message: 'Title is required',
  })
  title: string;

  @IsString({
    message: 'Description is required',
  })
  description: string;

  @IsString({
    message: 'Project id is required',
  })
  projectId: string;
}

export class UpdateTimeEntryDto extends PartialType(TimeEntryDto) {}
