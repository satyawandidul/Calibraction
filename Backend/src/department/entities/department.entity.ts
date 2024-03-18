import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DepartmentDocument = HydratedDocument<Department>;

@Schema()
export class Department {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
DepartmentSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    const { __v, _id, ...object } = ret;
    object.id = _id;
    object.isActive = object.isActive === true ? "Yes" : "No";
    return object;
  },
});
