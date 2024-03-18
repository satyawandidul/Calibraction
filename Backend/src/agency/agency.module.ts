import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Agency, AgencySchema } from './entities/agency.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Agency.name, schema: AgencySchema}])
  ],
  controllers: [AgencyController],
  providers: [AgencyService]
})
export class AgencyModule {}
