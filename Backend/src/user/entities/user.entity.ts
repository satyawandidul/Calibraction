import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";
import { Department } from "src/department/entities/department.entity";

export enum Role {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  Operator = "Operator",
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  firstname: string;

  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  @IsEmail()
  email: string;

  @Prop({ type: String, enum: Role, default: Role.Operator, required: true })
  role: Role;

  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
    required: true,
  })
  department: Department;
}

export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.method("toJSON", function () {
//   const { __v, _id, password, ...object } = this.toObject();
//   object.id = _id;
//   object.isActive = object.isActive === true ? "Yes" : "No";

//   // TODO: This may not be the right solution
//   // const {__v2, _id2, ...dept} = object.department;
//   // dept.id = _id2
//   // dept.isActive = (dept.isActive === true) ? "Yes" : "No"
//   // object.department = dept
//   return object;
// });

UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    const { __v, _id, ...object } = ret;
    object.id = _id;
    object.isActive = object.isActive === true ? "Yes" : "No";
    return object;
  },
});
