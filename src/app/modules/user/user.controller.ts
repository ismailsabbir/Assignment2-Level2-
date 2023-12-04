import { Request, Response } from 'express';
import { userservice } from './user.service';
import userValidationSchema, {
  userUpdatedValidationSchema,
} from './user.validation';
import TUser from './user.interface';
const createuser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const zodParseData = userValidationSchema.parse(user);
    const result = await userservice.createUserDB(zodParseData);
    res.status(200).json({
      sucess: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
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

const getalluser = async (req: Request, res: Response) => {
  try {
    const result = await userservice.getUserFromDb();
    res.status(200).json({
      sucess: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
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
    } else {
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

const updateaUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const user = req.body;
    const zodParseData = userUpdatedValidationSchema.parse(user);
    const result = await userservice.updateaUserDB(id, zodParseData as TUser);
    if (result) {
      const updateduser = await userservice.getaUserDB(id);
      res.status(200).json({
        sucess: true,
        message: 'User update successfully!',
        data: updateduser,
      });
    } else {
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
    } else {
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
    } else {
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
    } else {
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
    } else {
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
