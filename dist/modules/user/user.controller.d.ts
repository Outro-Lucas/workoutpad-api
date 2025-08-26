import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto } from './dto/user.dto';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: UserResponseDto;
    }>;
    findOne(id: string): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
}
