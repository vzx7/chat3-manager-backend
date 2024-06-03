import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNotEmptyObject, ValidateNested, IsNumber, IsEmail, IsBoolean, IsUrl } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    public domain: string;

    @IsNotEmpty()
    @IsBoolean()
    isSSL: boolean;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}

class AutoCenter {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    timezone: string;
}

class Consultant {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    male: number;

    @IsNotEmpty()
    photo: Blob;

    @IsNotEmpty()
    @IsString()
    description: string;
}

export class UpdateServiceDto {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsString()
    public name: string; 

    @IsNotEmpty()
    @IsString()
    public title: string; 

    @IsNotEmpty()
    @IsNumber()
    public type: number;

    @IsNotEmpty()
    @IsNumber()
    public brand: number;

    @IsNotEmpty()
    @IsString()
    public description: string; 

    @IsNotEmpty()
    @IsString()
    public personalPolice: string; 

    @IsString()
    @IsUrl()
    public url: string; 

    @IsNotEmpty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => AutoCenter)
    public autoCenter: AutoCenter;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => Consultant)
    public consultant: Consultant;
}

export class AccessServiceDto {
    domainId: number;
    active: boolean;
  }