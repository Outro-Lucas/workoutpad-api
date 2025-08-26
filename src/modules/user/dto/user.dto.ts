import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsNumber, Min, Max, IsEnum, Matches } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserType } from '../interfaces/user.interface';

export class CreateUserDto {
    @ApiPropertyOptional({
        enum: UserType,
        example: UserType.USER,
        description: 'Tipo do usuário (admin ou user)'
    })
    @IsOptional()
    @IsEnum(UserType)
    type?: UserType;

    @ApiProperty({
        example: 'usuario@email.com',
        description: 'Email do usuário'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'senha123',
        description: 'Senha com mínimo 6 caracteres',
        minLength: 6
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({
        example: 'João Silva',
        description: 'Nome do usuário (mínimo 2 caracteres)',
        minLength: 2
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @ApiPropertyOptional({
        example: '11999999999',
        description: 'Telefone com DDD (10 ou 11 dígitos)'
    })
    @IsOptional()
    // @Matches(/^(\+\d{1,3})?\d{10,11}$/, {
    //     message: 'Telefone deve ter 10 ou 11 dígitos'
    // })
    phone?: string;

    @ApiPropertyOptional({
        example: 'https://exemplo.com/foto.jpg',
        description: 'URL da foto do usuário'
    })
    @IsOptional()
    @IsString()
    photo?: string;

    @ApiPropertyOptional({
        example: 75,
        description: 'Peso em kg (entre 30 e 300)',
        minimum: 30,
        maximum: 300
    })
    @IsOptional()
    @IsNumber()
    @Min(30)
    @Max(300)
    weight?: number;

    @ApiPropertyOptional({
        example: 175,
        description: 'Altura em cm (entre 50 e 250)',
        minimum: 50,
        maximum: 250
    })
    @IsOptional()
    @IsNumber()
    @Min(50)
    @Max(250)
    height?: number;
}

@Exclude()
export class UserResponseDto {
    @Expose()
    @ApiProperty({
        example: '507f1f77bcf86cd799439011',
        description: 'ID único do usuário'
    })
    _id: string;

    @Expose()
    @ApiProperty({
        enum: UserType,
        example: UserType.USER,
        description: 'Tipo do usuário'
    })
    type: UserType;

    @Expose()
    @ApiProperty({
        example: 'usuario@email.com',
        description: 'Email do usuário'
    })
    email: string;

    @Expose()
    @ApiProperty({
        example: 'João Silva',
        description: 'Nome do usuário'
    })
    name: string;

    @Expose()
    @ApiPropertyOptional({
        example: '11999999999',
        description: 'Telefone do usuário'
    })
    phone?: string;

    @Expose()
    @ApiPropertyOptional({
        example: 'https://exemplo.com/foto.jpg',
        description: 'URL da foto do usuário'
    })
    photo?: string;

    @Expose()
    @ApiPropertyOptional({
        example: 75,
        description: 'Peso do usuário em kg'
    })
    weight?: number;

    @Expose()
    @ApiPropertyOptional({
        example: 175,
        description: 'Altura do usuário em cm'
    })
    height?: number;

    @Expose()
    @ApiProperty({
        example: '2024-01-15T10:00:00.000Z',
        description: 'Data de criação do usuário'
    })
    createdAt: Date;

    @Expose()
    @ApiProperty({
        example: '2024-01-15T10:00:00.000Z',
        description: 'Data da última atualização'
    })
    updatedAt: Date;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}