import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ToolService } from "./tool.service";
import { CreateToolDto } from "./dto/create-tool.dto";
import { UpdateToolDto } from "./dto/update-tool.dto";

@Controller("tool")
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Post()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolService.create(createToolDto);
  }

  @Get()
  findAll() {
    return this.toolService.findAll();
  }

  @Get("history/:id")
  findOne(@Param("id") id: string) {
    return this.toolService.findOne(id);
  }

  @Get(":deptId")
  getDepartmentUser(@Param("deptId") deptId: string) {
    return this.toolService.getDepartmentTools(deptId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolService.update(id, updateToolDto);
  }

  @Get("getCode/:type")
  getCode(@Param("type") type: string) {
    return this.toolService.getNextCode(type);
  }

  @Get("schedule/:date")
  getSchedule(@Param('date') date: Date) {
    return this.toolService.getCalibrationSchedule(date)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.toolService.remove(id);
  // }
}
