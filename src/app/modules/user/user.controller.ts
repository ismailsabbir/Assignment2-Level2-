import { Request, Response } from 'express';
import { userservice } from './user.service';
const createuser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const result = await userservice.createUserDB(user);

    res.status(200).json({
      sucess: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json(
        {
            "success": false,
            "message": "User creation failed",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        }
    )
  }
};
const getalluser = async (req: Request, res: Response) => {
  try {
    const result = await userservice.getUserFromDb();
    res.status(200).json({
      sucess: true,
      message: 'Student get sucessfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getaUser = async (req: Request, res: Response) => {
    try {
        const id=req.params.userId;
      const result = await userservice.getaUserDB(id);
      if(result){
        res.status(200).json({
          sucess: true,
          message: 'User fetched successfully!',
          data: result,
        });
      }
      else{
        res.status(404).json(
          {
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        }
        )
      }

    } catch (error) {
    res.status(404).json(
        {
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        }
    )
    }
  };
export const usercontroller = {
  createuser,
  getalluser,
  getaUser
};
