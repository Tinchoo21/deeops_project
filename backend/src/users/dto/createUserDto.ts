import {
  IsString,
  IsEmail,
  IsIn,
  Length,
  MinLength,
  IsNotEmpty,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(3, 32)
  firstName: string;

  @IsString()
  @Length(3, 32)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsIn(["muško", "žensko"])
  @IsNotEmpty()
  gender: string;
}
