import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from './entities/history.entity';
import { Tool, ToolSchema } from 'src/tool/entities/tool.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: History.name, schema: HistorySchema}]),
    MongooseModule.forFeature([{name: Tool.name, schema: ToolSchema}])
  ],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
