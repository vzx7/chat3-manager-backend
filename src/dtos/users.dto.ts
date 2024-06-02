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
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public fio: string;

  @IsString()
  @MinLength(9)
  @MaxLength(9)
  public phone: string;

  @IsString()
  public bio: string;

  @IsNumber()
  @IsBoolean()
  public active: string;
}