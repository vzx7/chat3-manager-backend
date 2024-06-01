import { IsString, IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    public domain: string;
}