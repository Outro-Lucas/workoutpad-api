import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsOptional,
    IsNumber,
    Min,
    Max,
    IsEnum,
    Matches
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { UserType } from '../interfaces/user.interface';

export class CreateUserDto {
    @IsOptional()
    @IsEnum(UserType)
    type?: UserType;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsOptional()
    // @Matches(/^(\+\d{1,3})?\d{10,11}$/, {
    //     message: 'Telefone deve ter 10 ou 11 dígitos'
    // })
    phone?: string;

    @IsOptional()
    @IsString()
    photo?: string;

    @IsOptional()
    @IsNumber()
    @Min(30)
    @Max(300)
    weight?: number;

    @IsOptional()
    @IsNumber()
    @Min(50)
    @Max(250)
    height?: number;
}

@Exclude()
export class UserResponseDto {
    @Expose()
    _id: string;

    @Expose()
    type: UserType;

    @Expose()
    email: string;

    @Expose()
    name: string;

    @Expose()
    phone?: string;

    @Expose()
    photo?: string;

    @Expose()
    weight?: number;

    @Expose()
    height?: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}