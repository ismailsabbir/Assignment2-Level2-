import { Model } from 'mongoose';

export type TName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};
// User interface
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders[];
};
// Static method for identifying the user by user-id.
export interface userstaticmathod extends Model<TUser> {
  isuserExit(id: string): Promise<TUser | null>;
}
// Static method for identifying the user by username.
export interface userNamestaticmathod extends Model<TUser> {
  isuserNameExit(username: string): Promise<TUser | null>;
}
export default TUser;
