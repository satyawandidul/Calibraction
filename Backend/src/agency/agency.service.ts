import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Agency, AgencyDocument } from './entities/agency.entity';
import { Model } from 'mongoose';

@Injectable()
export class AgencyService {

  constructor(
    @InjectModel(Agency.name) private agencyModel: Model<AgencyDocument>
  ){}

  async create(createAgencyDto: CreateAgencyDto) {
    var agency = await this.agencyModel.findOne({name: createAgencyDto.name}).exec()
    if (agency != null ) {return new ConflictException("Agency name already exists");}
    const created = new this.agencyModel(createAgencyDto);
    return await created.save();
  }

  async findAll() {
    return await this.agencyModel.find().exec();
  }

  async getAgenciesForDepartment(deptId: string) {
    return await this.agencyModel.find({ department: deptId }).exec();
  }

  async update(id: string, updateAgencyDto: UpdateAgencyDto) {
    return await this.agencyModel.findByIdAndUpdate(id, updateAgencyDto, {new: true});
  }

  async remove(id: string) {
    return await this.agencyModel.findByIdAndUpdate(id, {isActive: false}, {new: true});
  }
}
