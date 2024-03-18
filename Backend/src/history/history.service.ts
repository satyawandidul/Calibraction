import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { History, HistoryDocument } from './entities/history.entity';
import { Model } from 'mongoose';
import { Tool, ToolDocument } from 'src/tool/entities/tool.entity';

@Injectable()
export class HistoryService {

  constructor(
    @InjectModel(History.name) private historyService: Model<HistoryDocument>,
    @InjectModel(Tool.name) private toolsService: Model<ToolDocument>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto) {
    var created = new this.historyService(createHistoryDto);
    await created.save()
    
    // update Tool table as well
    var tool = await this.toolsService.findOne({_id: createHistoryDto.toolId}).populate("history").exec()
    if (tool != null) { 
      tool.history.push(created.id)
      await tool.save()
    }
    return created;
  }

  async findAll(deptId: string) {
    return await this.historyService.find({departmentId: deptId}).exec()
  }

  async findOne(id: string) {
    return await this.historyService.findOne({_id: id}).exec()
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto) {
    return await this.historyService.findByIdAndUpdate(id, updateHistoryDto, {new: true})
  }

  // TODO: Get the calibration calendar based on nextCalibrationDate field matches the current month
  async getCalibrationSchedule(date: Date) {
    return await this.historyService.aggregate([
      { $project: { name: 1, month: { $month: "$nextCalibrationDate" } } },
      { $match: {month: 3}}
    ]);
  }
}
