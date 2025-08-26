import { Document } from 'mongoose';
import { UserType } from '../interfaces/user.interface';
export type UserDocument = User & Document;
export declare class User {
    type: UserType;
    email: string;
    password: string;
    name: string;
    phone?: string;
    photo?: string;
    weight?: number;
    height?: number;
    createdAt: Date;
    validatePassword(plainPassword: string): Promise<boolean>;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
