import { Request, Response } from 'express';
import { userservice } from './user.service';
const createuser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const result = await userservice.createUserDB(user);
    console.log(result);
    res.status(200).json({
      sucess: true,
      message: 'Susessfull created',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }

};
const getalluser=async(req:Request,res:Response)=>{
    try{
const result=await userservice.getUserFromDb();
res.status(200).json({
    sucess:true,
    message:'Student get sucessfully',
    data:result,
})
    }
    catch(error){
        console.log(error);
    }
}
export const usercontroller = {
  createuser,
  getalluser
};
