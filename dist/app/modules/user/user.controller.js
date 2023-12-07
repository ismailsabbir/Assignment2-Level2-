"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usercontroller = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importStar(require("./user.validation"));
const zod_1 = require("zod");
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const zodErrorValidation_1 = __importDefault(require("../../../middleware/errors/zodErrorValidation"));
// create user into DB
const createuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const zodParseData = user_validation_1.default.parse(user);
        const userid = user.userId.toString();
        const username = user.username;
        // Check whether the user ID was previously present or not
        if (yield user_model_1.UserModel.isuserExit(userid)) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: 'User creation failed',
                error: {
                    code: http_status_1.default.BAD_REQUEST,
                    description: 'User ID must Be Unique.',
                },
            });
        }
        // Check whether the user Name was previously present or not
        else if (yield user_model_1.UserModel.isuserNameExit(username)) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: 'User creation failed',
                error: {
                    code: http_status_1.default.BAD_REQUEST,
                    description: 'The user name Must Be unique.',
                },
            });
        }
        const result = yield user_service_1.userservice.createUserDB(zodParseData);
        res.status(200).json({
            sucess: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        // Check whether the Erro type is ZodError or not. I sent a response for the zod error in the client.
        if (error instanceof zod_1.ZodError) {
            const simplifiedError = (0, zodErrorValidation_1.default)(error);
            const statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
            const errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
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
});
// Get all user information from Db
const getalluser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userservice.getUserFromDb();
        res.status(200).json({
            sucess: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
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
});
// Get a single user from DB by userId
const getaUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.userservice.getaUserDB(id);
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
    }
    catch (error) {
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
});
// Update user information
const updateaUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const user = req.body;
        // Check  Zod Updeted validations
        const zodParseData = user_validation_1.userUpdatedValidationSchema.parse(user);
        const result = yield user_service_1.userservice.updateaUserDB(id, zodParseData);
        if (result) {
            const updateduser = yield user_service_1.userservice.getaUserDB(id);
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
    }
    catch (error) {
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
});
// Delate User information from DB
const delateaUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.userservice.delateaUserDB(id);
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
    }
    catch (error) {
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
});
// Add order information in user data
const addorder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const order = req.body;
        const result = yield user_service_1.userservice.addorderDB(id, order);
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
    }
    catch (error) {
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
});
// Get only user order information
const getUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.userservice.getUserOrdersDB(id);
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
    }
    catch (error) {
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
});
// Get user orders total amount from DB
const getUserOrderTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.userservice.getOrdersTotlPriceDB(id);
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
    }
    catch (error) {
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
});
exports.usercontroller = {
    createuser,
    getalluser,
    getaUser,
    updateaUser,
    delateaUser,
    addorder,
    getUserOrder,
    getUserOrderTotalPrice,
};
