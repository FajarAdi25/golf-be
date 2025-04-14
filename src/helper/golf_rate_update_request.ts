import { NATIONALITY, REMARKS, ACTIVE_STATUS } from "../entity/golf_rates";
import { IsEnum, IsOptional, IsNumber, IsString } from "class-validator";

export class GolfRateUpdateRequest {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  golf_course?: string;

  @IsOptional()
  @IsEnum(NATIONALITY)
  nationality?: NATIONALITY;

  @IsOptional()
  @IsNumber()
  week_day?: number;

  @IsOptional()
  @IsNumber()
  week_day_visitor?: number;

  @IsOptional()
  @IsNumber()
  weekend_public_holiday?: number;

  @IsOptional()
  @IsNumber()
  weekend_public_holiday_visitor?: number;

  @IsOptional()
  @IsNumber()
  weekend_saturday_afternoon?: number;

  @IsOptional()
  @IsNumber()
  weekend_saturday_afternoon_visitor?: number;

  @IsOptional()
  @IsNumber()
  weekend_sunday_afternoon?: number;

  @IsOptional()
  @IsNumber()
  weekend_sunday_afternoon_visitor?: number;

  @IsOptional()
  @IsEnum(REMARKS)
  remarks?: REMARKS;

  @IsOptional()
  @IsString()
  updated_by?: string;

  @IsOptional()
  @IsEnum(ACTIVE_STATUS)
  active_status_id?: ACTIVE_STATUS;
}
