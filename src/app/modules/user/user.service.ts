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
  if(await UserModel.isuserExit(id)){
    const result=await UserModel.findOne({userId:id},{
      userId:1,
      username:1,
      fullName:1,
      age:1,
      email:1,
      isActive:1,
      hobbies:1,
      address:1,
      orders:1
})
return result;
  }
    // const result=await UserModel.findOne({userId: id});

}


export const userservice = {
  createUserDB,
  getUserFromDb,
  getaUserDB
};
