import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Department, DepartmentDocument } from './entities/department.entity';
import { Model } from 'mongoose';

@Injectable()
export class DepartmentService {

  constructor(
    @InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    var dept = await this.departmentModel.findOne({name: createDepartmentDto.name}).exec();
    if (dept != null) { return new ConflictException("Department already exists");}
    const created = new this.departmentModel(createDepartmentDto);
    return await created.save();
  }

  async findAll() {
    return await this.departmentModel.find().exec();
  }

  async findOne(id: string) {
    return await this.departmentModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return await this.departmentModel.findByIdAndUpdate(id, updateDepartmentDto, {new: true});
  }

  async remove(id: string) {
    return await this.departmentModel.findByIdAndUpdate(id, {isActive: false}, {new: true});
  }
}
