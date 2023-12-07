import { Request, Response } from 'express';
import { userservice } from './user.service';
import userValidationSchema, {
  userUpdatedValidationSchema,
} from './user.validation';
import TUser from './user.interface';
import { ZodError } from 'zod';
import { UserModel } from './user.model';
import httpStatus from 'http-status';
import handleZodError from '../../../middleware/errors/zodErrorValidation';
// create user into DB
const createuser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParseData = userValidationSchema.parse(user);
    const userid = user.userId.toString();
    const username = user.username;
    // Check whether the user ID was previously present or not
    if (await UserModel.isuserExit(userid)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User creation failed',
        error: {
          code: httpStatus.BAD_REQUEST,
          description: 'User ID must Be Unique.',
        },
      });
    }
    // Check whether the user Name was previously present or not
    else if (await UserModel.isuserNameExit(username)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User creation failed',
        error: {
          code: httpStatus.BAD_REQUEST,
          description: 'The user name Must Be unique.',
        },
      });
    }
    const result = await userservice.createUserDB(zodParseData);
    res.status(200).json({
      sucess: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    // Check whether the Erro type is ZodError or not. I sent a response for the zod error in the client.
    if (error instanceof ZodError) {
      const simplifiedError = handleZodError(error);
      const statusCode = simplifiedError?.statusCode;
      const errorSources = simplifiedError?.errorSources;
      return res.status(statusCode).json({
        success: false,
        message: 'User creation failed',
        error: {
          code: simplifiedError.statusCode,
          description: errorSources,
        },
      });
    }
    // Sent response for other error
    res.status(404).json({
      success: false,
      message: 'User creation failed',
      error: {
        code: 404,
        description: 'Something went wrong!',
      },
    });
  }
};
// Get all user information from Db
const getalluser = async (req: Request, res: Response) => {
  try {
    const result = await userservice.getUserFromDb();
    res.status(200).json({
      sucess: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    // In fetching data from DB an error response is sent to the client.
    res.status(404).json({
      success: false,
      message: 'Users fetched failed',
      error: {
        code: 404,
        description: error,
      },
    });
  }
};
// Get a single user from DB by userId
const getaUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userservice.getaUserDB(id);
    if (result) {
      res.status(200).json({
        sucess: true,
        message: 'User fetched successfully!',
        data: result,
      });
    }
    // Sent response for user id not found
    else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    // In fetching data from DB an error response is sent to the client.
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// Update user information
const updateaUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const user = req.body;
    // Check  Zod Updeted validations
    const zodParseData = userUpdatedValidationSchema.parse(user);
    const result = await userservice.updateaUserDB(id, zodParseData as TUser);
    if (result) {
      const updateduser = await userservice.getaUserDB(id);
      res.status(200).json({
        sucess: true,
        message: 'User update successfully!',
        data: updateduser,
      });
    }
    // Sent response for user id not found
    else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    // In updateing data from DB an error response is sent to the client.
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// Delate User information from DB
const delateaUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userservice.delateaUserDB(id);
    if (result) {
      res.status(200).json({
        sucess: true,
        message: 'User deleted successfully',
        data: null,
      });
    }
    // Sent response for user id not found
    else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    // In deleting data from DB an error response is sent to the client.
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// Add order information in user data
const addorder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const order = req.body;
    const result = await userservice.addorderDB(id, order);
    if (result) {
      res.status(200).json({
        sucess: true,
        message: 'Order created successfully!',
        data: null,
      });
    }
    // Sent response for user id not found
    else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    // In add order data from DB an error response is sent to the client.
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// Get only user order information
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userservice.getUserOrdersDB(id);
    if (result) {
      res.status(200).json({
        sucess: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    }
    // Sent response for user id not found
    else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    // In fetching data from DB an error response is sent to the client.
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// Get user orders total amount from DB
const getUserOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userservice.getOrdersTotlPriceDB(id);
    if (result) {
      res.status(200).json({
        sucess: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    }
    // Sent response for user id not found
    else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    // In fetching data from DB an error response is sent to the client.
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const usercontroller = {
  createuser,
  getalluser,
  getaUser,
  updateaUser,
  delateaUser,
  addorder,
  getUserOrder,
  getUserOrderTotalPrice,
};
