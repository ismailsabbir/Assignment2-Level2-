
import TUser from './user.interface';
import { UserModel } from './user.model';

const createUserDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};
const getUserFromDb=async()=>{
const result=UserModel.find();
return result;
}
export const userservice = {
  createUserDB,
  getUserFromDb
};
