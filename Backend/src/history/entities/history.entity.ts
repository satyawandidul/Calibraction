import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { type } from "os";
import { Agency } from "src/agency/entities/agency.entity";

export enum Status {
  Pending = "Pending",
  Complete = "Complete",
}

export type HistoryDocument = HydratedDocument<History>;

@Schema()
export class History {
  @Prop({ type: String, required: true })
  toolId: string;

  @Prop({ type: String, required: true })
  toolName: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  codeNo: string;

  @Prop({ type: String, required: true })
  manufacturer: string;

  @Prop({ type: String, required: true })
  frequency: string;

  @Prop({ type: Date, required: true })
  calibrationDate: Date;

  @Prop({ type: String, required: true })
  agency: string;

  @Prop({ type: String, required: true })
  certificatePath: string;

  @Prop({ type: String, required: true })
  certificateNo: string;

  @Prop({ type: String, required: true })
  result: string;

  @Prop({ type: String, enum: Status, default: Status.Pending, required: true })
  status: Status;

  @Prop({ type: Date, required: true })
  nextCalibrationDate: Date;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({type: String, required: true})
  departmentId: string
}

export const HistorySchema = SchemaFactory.createForClass(History);
HistorySchema.method("toJSON", function () {
  const { __v, _id, calibrationDate, nextCalibrationDate, ...object } =
    this.toObject();
  object.id = _id;
  // object.calibrationDate = new Date(calibrationDate).toISOString().slice(0,10)
  object.calibrationDate = new Date(calibrationDate).toLocaleDateString();
  object.nextCalibrationDate = new Date(
    nextCalibrationDate
  ).toLocaleDateString();
  return object;
});
