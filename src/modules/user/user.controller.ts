import { Controller, Post, Body, Get, Param, HttpCode, HttpStatus, UseInterceptors, ClassSerializerInterceptor, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, UserResponseDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Usuários')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Criar um novo usuário' })
    @ApiResponse({
        status: 201,
        description: 'Usuário criado com sucesso',
        type: UserResponseDto
    })
    @ApiResponse({ status: 409, description: 'Usuário já existe' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() createUserDto: CreateUserDto): Promise<{
        message: string;
        user: UserResponseDto
    }> {
        const user = await this.userService.create(createUserDto);
        return {
            message: 'Usuário criado com sucesso',
            user: new UserResponseDto(user),
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar usuário por ID' })
    @ApiResponse({
        status: 200,
        description: 'Usuário encontrado',
        type: UserResponseDto
    })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @ApiParam({ name: 'id', description: 'ID do usuário' })
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const { password, ...userWithoutPassword } = user.toObject();
        return new UserResponseDto(userWithoutPassword);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({
        status: 200,
        description: 'Lista de usuários',
        type: [UserResponseDto]
    })
    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userService.findAll();
        return users.map(user => new UserResponseDto(user));
    }
}