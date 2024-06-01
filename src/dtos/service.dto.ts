import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNotEmptyObject, ValidateNested, IsNumber, IsEmail } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    public domain: string;
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
    @IsString()
    public domain: string;

    @IsNotEmpty()
    @IsString()
    public type: string; 

    @IsNotEmpty()
    @IsString()
    public brand: string;

    @IsNotEmpty()
    @IsString()
    public description: string; 

    @IsNotEmpty()
    @IsString()
    public personalPolice: string; 

    @IsString()
    public url: string; 

    @IsNotEmpty()
    @IsNotEmptyObject()
    @ValidateNested({ each: true })
    @Type(() => AutoCenter)
    public autoCenter: AutoCenter;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @ValidateNested({ each: true })
    @Type(() => Consultant)
    public consultant: Consultant;
}