import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { ChangePasswordDto } from "src/auth/dto/change-password.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    var user = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();
      console.log(user);
    if (user != null) {
      return new ConflictException("User already exists");
    }

    // fetch password and encrypt it
    var pass = createUserDto.password;
    createUserDto.password = await bcrypt.hash(pass, 10);

    const created = new this.userModel(createUserDto);
    return await created.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  // This will return all the users for selected department
  async getDepartUsers(id: string) {
    return await this.userModel
      .find({ department: id })
      .populate("department")
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndUpdate(
      id,
      { isActive: false },
      {
        new: true,
      }
    );
  }

  async authenticate(username: string, pass: string) {
    var user = await this.userModel
      .findOne({ username: username })
      .populate("department")
      .exec();
    if (user == null) {
      throw new NotFoundException({message: 'User not found'});
    }
    var matching = await bcrypt.compare(pass, user.password);
    if (matching === false) {
      throw new UnauthorizedException({message: 'Incorrect Password'});
    }
    return user;
    // const {password, ...result} = user
    // return result;
  }

  async updatePassword(changePassordDto: ChangePasswordDto) {
    try {
      var user = await this.authenticate(
        changePassordDto.username,
        changePassordDto.password
      );

      user.password = await bcrypt.hash(changePassordDto.newPassword, 10);
      
      return await this.userModel.findByIdAndUpdate(
        changePassordDto.id,
        { password: user.password },
        { new: true }
      );
    } catch (error) {
      return "User not found or authentication failure";
    }
  }
}
