import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tool, ToolSchema } from './entities/tool.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Tool.name, schema: ToolSchema}])
  ],
  controllers: [ToolController],
  providers: [ToolService]
})
export class ToolModule {}
