import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public fio: string;

  @IsNumber()
  @IsNotEmpty()
  public phone: number;

  @IsString()
  public bio: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class UpdateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  public fio: string;

  @IsNumber()
  public phone: number;

  @IsString()
  public bio: string;
}