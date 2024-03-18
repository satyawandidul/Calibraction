import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ScheduleDocument = HydratedDocument<Schedule>

@Schema()
export class Schedule {
   
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
ScheduleSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})
