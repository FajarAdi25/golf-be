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

export class UserUpdateRequest {
  @Length(3)
  username: string;

  @IsInt()
  approval_status: number;

  @Length(3)
  updated_by: string;
}
