import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Get(':deptId')
  findAll(@Param('deptId') deptId: string) {
    return this.historyService.findAll(deptId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.historyService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @Get('calibrationSchedule/:date') 
  getSchedule(@Param('date') date: Date) {
    return this.historyService.getCalibrationSchedule(date)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.historyService.remove(id);
  // }
}
