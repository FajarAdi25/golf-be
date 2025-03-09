import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsDate,
  Min,
  MinLength,
  Max,
  IsArray,
} from "class-validator";

export class CustomerUpdateRequest {
  @Length(3)
  company_name: string;
  @Length(3)
  company_code: string;
  @Length(1)
  company_address: string;
  @Length(3)
  company_address_building: string;
  @IsInt()
  company_street_number: number;
  @Length(3)
  company_street_name: string;
  @IsInt()
  company_building_no: number;
  @Length(3)
  company_building_unit: string;
  @Length(3)
  company_building_name: string;
  @Length(3)
  company_city: string;
  @Length(3)
  company_state: string;
  @Length(3)
  company_country: string;
  @IsInt()
  company_zip_code: number;
  @IsInt()
  company_fax: number;
  @Length(3)
  company_website: string;
  @Length(3)
  company_pic: string;
  @Length(3)
  company_designation: string;
  @IsEmail()
  company_email: string;
  @Length(3)
  company_phone: string;
  // @Length(3)
  // updated_by: string;
}
