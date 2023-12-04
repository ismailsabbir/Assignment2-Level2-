/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import TUser, {
  TAddress,
  TName,
  TOrders,
  userstaticmathod,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
export const nameSchema = new Schema<TName>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});
export const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});
export const orderschema = new Schema<TOrders>({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});
const userschema = new Schema<TUser, userstaticmathod>({
  userId: {
    type: Number,
    // unique: true,
  },
  username: {
    type: String,
    // unique: true,
  },
  password: {
    type: String,
  },
  fullName: {
    type: nameSchema,
  },
  age: { type: Number },
  email: { type: String },
  isActive: {
    type: Boolean,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: addressSchema,
  },
  orders: {
    type: [orderschema],
  },
});
userschema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});
userschema.post('save', function (doco: TUser, next) {
  doco.password = '';
  next();
});

userschema.statics.isuserExit = async function (id: string) {
  const exituser = UserModel.findOne({ userId: id });
  return exituser;
};
// userschema.pre('save',async function(next){
//   const isUserIdExist=await UserModel.find({userId:this.userId});
//   if(isUserIdExist){
//     throw new Error('Already Exist');
//   }
//   next();
// })
export const UserModel = model<TUser, userstaticmathod>('users', userschema);
