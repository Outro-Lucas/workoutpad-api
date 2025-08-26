export declare enum UserType {
    ADMIN = "admin",
    USER = "user"
}
export interface IUser {
    _id?: string;
    type: UserType;
    email: string;
    password: string;
    name: string;
    phone?: string;
    photo?: string;
    weight?: number;
    height?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IUserResponse extends Omit<IUser, 'password'> {
    _id: string;
}
