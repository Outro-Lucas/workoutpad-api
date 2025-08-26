import { UserType } from '../interfaces/user.interface';
export declare class CreateUserDto {
    type?: UserType;
    email: string;
    password: string;
    name: string;
    phone?: string;
    photo?: string;
    weight?: number;
    height?: number;
}
export declare class UserResponseDto {
    _id: string;
    type: UserType;
    email: string;
    name: string;
    phone?: string;
    photo?: string;
    weight?: number;
    height?: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<UserResponseDto>);
}
