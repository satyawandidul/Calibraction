import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Mongoose } from "mongoose";
import { Agency } from "src/agency/entities/agency.entity";
import { Department } from "src/department/entities/department.entity";
import { History } from "src/history/entities/history.entity";

export type ToolDocument = HydratedDocument<Tool>;

export enum Status {
  InUse = "In-Use",
  Lost = "Lost",
  Scrapped = "Scrapped",
}

@Schema()
export class Tool {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  codeNo: string;

  @Prop({ type: String, required: true })
  manufacturer: string;

  @Prop({ type: String, required: true })
  range: string;

  @Prop({ type: String, required: true })
  leastCount: string;

  @Prop({ type: Number, required: true })
  frequency: number;

  @Prop({ type: String, required: true })
  acceptanceCriteria: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Agency.name,
    required: true,
  })
  agency: Agency;

  @Prop({ type: String, enum: Status, default: Status.InUse, required: true })
  status: Status;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: History.name })
  history: History[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
    required: true,
  })
  department: Department;
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
ToolSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    const { __v, _id, ...object } = ret;
    object.id = _id;
    return object;
  },
});
