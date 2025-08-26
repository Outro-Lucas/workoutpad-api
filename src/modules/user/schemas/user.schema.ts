import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserType } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({
        required: true,
        enum: UserType,
        default: UserType.USER
    })
    type: UserType;

    @Prop({
        required: true,
        unique: true,
        lowercase: true,
        // match: [/^\S+@\S+\.\S+$/, 'Por favor, use um email válido']
    })
    email: string;

    @Prop({
        required: true,
        // minlength: 6
    })
    password: string;

    @Prop({
        required: true,
        trim: true,
        // maxlength: 50
    })
    name: string;

    @Prop({
        // match: [/^(\+\d{1,3})?\d{10,11}$/, 'Por favor, use um telefone válido']
    })
    phone?: string;

    @Prop()
    photo?: string;

    @Prop({
        min: 30,
        max: 300
    })
    weight?: number;

    @Prop({
        min: 50,
        max: 250
    })
    height?: number;

    @Prop({ default: Date.now })
    createdAt: Date;

    // Método para validar senha
    async validatePassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this.password);
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash da senha antes de salvar
UserSchema.pre<UserDocument>('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Index para melhor performance
UserSchema.index({ email: 1 });
UserSchema.index({ type: 1 });