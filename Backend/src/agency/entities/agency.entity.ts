import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail } from "class-validator";
import { HydratedDocument } from "mongoose";

export type AgencyDocument = HydratedDocument<Agency>;

@Schema()
export class Agency {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  contactPerson: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  @IsEmail()
  email: string;

  @Prop({ type: Number, required: true })
  phone: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String, required: true })
  department: string;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
// AgencySchema.method('toJSON', function () {
//     const { __v, _id, ...object } = this.toObject()
//     object.id = _id
//     object.isActive = (object.isActive === true) ? "Yes" : "No"
//     return object
// })
AgencySchema.set("toJSON", {
  transform: function (doc, ret, options) {
    const { __v, _id, ...object } = ret;
    object.id = _id;
    object.isActive = object.isActive === true ? "Yes" : "No";
    return object;
  },
});
