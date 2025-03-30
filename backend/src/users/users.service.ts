import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByUsernameOrEmail(identifier: string): Promise<User | null> {
    return this.userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] });
  }

  async create(userData: { fullName: string; username: string; email: string; password: string; role: string }): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }
}
