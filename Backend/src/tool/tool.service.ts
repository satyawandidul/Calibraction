import { ConflictException, Injectable } from "@nestjs/common";
import { CreateToolDto } from "./dto/create-tool.dto";
import { UpdateToolDto } from "./dto/update-tool.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Status, Tool, ToolDocument } from "./entities/tool.entity";
import { Model } from "mongoose";

@Injectable()
export class ToolService {
  constructor(
    @InjectModel(Tool.name) private toolsService: Model<ToolDocument>
  ) {}

  async create(createToolDto: CreateToolDto) {
    var tool = await this.toolsService
      .findOne({ codeNo: createToolDto.codeNo })
      .exec();
    if (tool != null) {
      return new ConflictException("Code No already exists");
    }
    var created = new this.toolsService(createToolDto);
    return await created.save();
  }

  async findAll() {
    return await this.toolsService.find().populate("agency").exec();
  }

  async getDepartmentTools(id: string) {
    return await this.toolsService
      .find({ department: id })
      .populate("agency")
      .exec();
  }

  async getCalibrationSchedule(date: Date) {
    const startDate = new Date("01-06-2023");
    const endDate = new Date("30-06-2023");
    return await this.toolsService
      .find()
      .populate({
        path: "history",
        populate: {
          path: "agency",
        },
      })
      .exec()
  }

  async findOne(id: string) {
    // return await this.toolsService
    //   .findOne({ _id: id })
    //   .populate("history")
    //   .populate("agency")
    //   .exec();
    return await this.toolsService
      .findOne({ _id: id })
      .populate("agency")
      .populate({
        path: "history",
        populate: {
          path: "agency",
        },
      })
      .exec();
  }

  async update(id: string, updateToolDto: UpdateToolDto) {
    return await this.toolsService.findByIdAndUpdate(id, updateToolDto, {
      new: true,
    });
  }

  async getNextCode(type: string) {
    let code = "EI/";
    let count = await this.toolsService.count({ type: type }).exec();
    count++;
    switch (type) {
      case "Vernier-Caliper":
        code += "VC/" + count.toString().padStart(4, "0");
        break;
      case "Micrometer":
        code += "MM/" + count.toString().padStart(4, "0");
        break;
      case "Depth-Gauge":
        code += "DG/" + count.toString().padStart(4, "0");
        break;
      case "Other-Gauge":
        code += "OT/" + count.toString().padStart(4, "0");
        break;
    }
    return code;
  }

  // TODO: This is nor required as we can use the update patch request to achieve this task
  // async changeToolStatus(id: string, status:Status) {
  //   return await this.toolsService.findByIdAndUpdate(id, {status: status}, {new: true})
  // }
}
