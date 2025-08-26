import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    ClassSerializerInterceptor,
    NotFoundException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto } from './dto/user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<{
        message: string;
        user: UserResponseDto
    }> {
        const user = await this.usersService.create(createUserDto);
        return {
            message: 'Usuário criado com sucesso',
            user: new UserResponseDto(user),
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
        const user = await this.usersService.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const { password, ...userWithoutPassword } = user.toObject();
        return new UserResponseDto(userWithoutPassword);
    }

    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.usersService.findAll();
        return users.map(user => new UserResponseDto(user));
    }
}