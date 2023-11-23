import TUser, { TOrders } from './user.interface';
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
}
const delateaUserDB=async(id:string)=>{
  if(await UserModel.isuserExit(id)){
    const result=await UserModel.deleteOne({userId:id})
return result;
  }
}

const updateaUserDB=async(id:string,user:TUser)=>{
  if(await UserModel.isuserExit(id)){
    const newid:number=parseInt(id)
    const result=await UserModel.updateOne({userId:newid},
      {
        $set: {
          userId: user?.userId,
          username: user?.username,
          password: user?.password,
          fullName: user?.fullName,
          age: user?.age,
          email: user?.email,
          isActive: user?.isActive,
          hobbies: user?.hobbies,
          address:user?.address ,
          orders: user?.orders,
        }
    }
)

return result
  }
}

const addorderDB=async(userid:string,order:TOrders)=>{
  if(await UserModel.isuserExit(userid)){
    const user = await UserModel.findOne({userId:userid});
    if (!user) {
      return;
    }
    if (user.orders) {
      const result= await UserModel.updateOne({userId:userid},
        {
          $push: {
            orders: order,
          }
      }
      )
      return result
    } else {
      const result= await UserModel.updateOne({userId:userid},
        {
          $set: {
          orders:[order]
          }
      }
      )
      return result
    }

  }

}


const getUserOrdersDB=async(userid:string)=>{
  if(await UserModel.isuserExit(userid)){
    const user = await UserModel.findOne({userId:userid});
    if (user?.orders) {
      const result=user?.orders;
      return result
    }
  }

}

export const userservice = {
  createUserDB,
  getUserFromDb,
  getaUserDB,
  updateaUserDB,
  delateaUserDB,
  addorderDB,
  getUserOrdersDB
};
