import TUser from './user.interface';
import { UserModel } from './user.model';

const createUserDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};
const getUserFromDb = async () => {
  const result = UserModel.aggregate([
    {$match:{}},
    {
        $project: {
            username:1,
            fullName:1,
            age:1,
            email:1,
            address:1
        }
      }
])
  return result;
};
const getaUserDB=async(id:string)=>{
    const result=await UserModel.findOne({id});
    return result;
}


export const userservice = {
  createUserDB,
  getUserFromDb,
  getaUserDB
};
