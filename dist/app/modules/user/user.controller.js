"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usercontroller = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const createuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const { error, value } = user_validation_1.userSchema.validate(user);
        console.log(value);
        if (error) {
            res.status(404).json({
                success: false,
                message: 'User creation failed',
                error: {
                    code: 404,
                    description: error.details,
                },
            });
        }
        const result = yield user_service_1.userservice.createUserDB(user);
        res.status(200).json({
            sucess: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User creation failed',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
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
const updateaUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const user = req.body;
        const result = yield user_service_1.userservice.updateaUserDB(id, user);
        if (result) {
            const updateduser = yield user_service_1.userservice.getaUserDB(id);
            res.status(200).json({
                sucess: true,
                message: 'User update successfully!',
                data: updateduser,
            });
        }
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
