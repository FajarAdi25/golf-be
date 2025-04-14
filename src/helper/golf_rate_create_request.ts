import { NATIONALITY, REMARKS, ACTIVE_STATUS } from "../entity/golf_rates";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
} from "class-validator";

export class GolfRateCreateRequest {
  @IsNotEmpty({ message: "Company name is required" })
  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  golf_course?: string;

  @IsNotEmpty({ message: "Nationality is required" })
  @IsEnum(NATIONALITY)
  nationality: NATIONALITY;

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

  @IsNotEmpty({ message: "Remarks is required" })
  @IsEnum(REMARKS)
  remarks: REMARKS;

  @IsOptional()
  @IsString()
  created_by?: string;

  @IsOptional()
  @IsEnum(ACTIVE_STATUS)
  active_status_id?: ACTIVE_STATUS;
}
