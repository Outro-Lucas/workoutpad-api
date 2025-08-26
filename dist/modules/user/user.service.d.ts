import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { IUserResponse } from './interfaces/user.interface';
import { CreateUserDto } from './dto/user.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<IUserResponse>;
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    findAll(): Promise<IUserResponse[]>;
}
