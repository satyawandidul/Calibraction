import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { AgencyModule } from './agency/agency.module';
import { ToolModule } from './tool/tool.module';
import { HistoryModule } from './history/history.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/calibration'), 
    UserModule, 
    DepartmentModule, 
    AgencyModule, ToolModule, HistoryModule, ScheduleModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
