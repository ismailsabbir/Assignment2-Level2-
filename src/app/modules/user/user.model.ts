import { Schema, model } from 'mongoose';
import TUser, { TAddress, TName } from './user.interface';
export const nameSchema=new Schema<TName>(
    {
        firstName:{
            type:String,
        },
        lastName:{
            type:String,
        }
    }
)
export const addressSchema=new Schema<TAddress>(
    {
        street:{
            type:String
        },
        city:{
            type:String
        },
        country:{
            type:String
        }
    }
)

const userschema = new Schema<TUser>({
  userId: { type: Number, unique: true },
  username: {
type:String,unique:true
  },
  password:{
    type:String
  },
  fullName:{
    type:nameSchema
  },
  age: { type: Number },
  email:{type:String},
  isActive:{
    type:Boolean
  },
  hobbies:{
    type:[String]
  },
  address: {
    type:addressSchema
  },
  orders:{
    productName:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    }
  }
});
export const UserModel = model<TUser>('student', userschema);
