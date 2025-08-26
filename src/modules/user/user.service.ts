import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { IUserResponse, UserType } from './interfaces/user.interface';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<IUserResponse> {
        const { email, type = UserType.USER, ...rest } = createUserDto;

        // Verificar se usuário já existe
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('Usuário já existe');
        }

        try {
            // Criar usuário
            const user = new this.userModel({
                email,
                type,
                ...rest,
            });

            await user.save();

            // Retornar usuário sem a senha
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword as IUserResponse;
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Email já está em uso');
            }
            throw new InternalServerErrorException('Erro ao criar usuário');
        }
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email });
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id);
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    async findAll(): Promise<IUserResponse[]> {
        const users = await this.userModel.find().select('-password').exec();
        return users as IUserResponse[];
    }
}