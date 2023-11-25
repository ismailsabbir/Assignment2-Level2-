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
exports.userservice = void 0;
const user_model_1 = require("./user.model");
// for creating User
const createUserDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
    console.log(result);
    return result;
});
// For Get All User Information
const getUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.UserModel.aggregate([
        { $match: {} },
        {
            $project: {
                username: 1,
                fullName: 1,
                age: 1,
                email: 1,
                address: 1,
            },
        },
    ]);
    return result;
});
// Get a Single User Information by UserId
const getaUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isuserExit(id)) {
        const result = yield user_model_1.UserModel.findOne({ userId: id }, {
            userId: 1,
            username: 1,
            fullName: 1,
            age: 1,
            email: 1,
            isActive: 1,
            hobbies: 1,
            address: 1,
            orders: 1,
        });
        return result;
    }
});
// Delate User data from database
const delateaUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isuserExit(id)) {
        const result = yield user_model_1.UserModel.deleteOne({ userId: id });
        return result;
    }
});
// Update user data
const updateaUserDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isuserExit(id)) {
        const newid = parseInt(id);
        const result = yield user_model_1.UserModel.updateOne({ userId: newid }, {
            $set: {
                userId: user === null || user === void 0 ? void 0 : user.userId,
                username: user === null || user === void 0 ? void 0 : user.username,
                password: user === null || user === void 0 ? void 0 : user.password,
                fullName: user === null || user === void 0 ? void 0 : user.fullName,
                age: user === null || user === void 0 ? void 0 : user.age,
                email: user === null || user === void 0 ? void 0 : user.email,
                isActive: user === null || user === void 0 ? void 0 : user.isActive,
                hobbies: user === null || user === void 0 ? void 0 : user.hobbies,
                address: user === null || user === void 0 ? void 0 : user.address,
                orders: user === null || user === void 0 ? void 0 : user.orders,
            },
        });
        return result;
    }
});
// Add Order
const addorderDB = (userid, order) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isuserExit(userid)) {
        const user = yield user_model_1.UserModel.findOne({ userId: userid });
        if (!user) {
            return;
        }
        if (user.orders) {
            const result = yield user_model_1.UserModel.updateOne({ userId: userid }, {
                $push: {
                    orders: order,
                },
            });
            return result;
        }
        else {
            const result = yield user_model_1.UserModel.updateOne({ userId: userid }, {
                $set: {
                    orders: [order],
                },
            });
            return result;
        }
    }
});
// Get all Orders
const getUserOrdersDB = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isuserExit(userid)) {
        const user = yield user_model_1.UserModel.findOne({ userId: userid });
        if (user === null || user === void 0 ? void 0 : user.orders) {
            const orders = user === null || user === void 0 ? void 0 : user.orders;
            return { orders };
        }
    }
});
// Get Orders Total Price
const getOrdersTotlPriceDB = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    const newuserid = parseInt(userid);
    if (yield user_model_1.UserModel.isuserExit(userid)) {
        const result = yield user_model_1.UserModel.aggregate([
            { $match: { userId: { $eq: newuserid } } },
            { $unwind: '$orders' },
            {
                $group: {
                    _id: null,
                    totalprice: { $sum: "$orders.price" },
                },
            },
            {
                $project: {
                    totalprice: 1,
                },
            },
        ]);
        const totalPrice = result[0].totalprice;
        const result1 = { totalPrice };
        return result1;
    }
});
exports.userservice = {
    createUserDB,
    getUserFromDb,
    getaUserDB,
    updateaUserDB,
    delateaUserDB,
    addorderDB,
    getUserOrdersDB,
    getOrdersTotlPriceDB,
};
