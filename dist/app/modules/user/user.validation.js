"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.addressSchema = exports.nameSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.nameSchema = joi_1.default.object({
    firstName: joi_1.default.string(),
    lastName: joi_1.default.string(),
});
exports.addressSchema = joi_1.default.object({
    street: joi_1.default.string(),
    city: joi_1.default.string(),
    country: joi_1.default.string(),
});
const orderSchema = joi_1.default.object({
    productName: joi_1.default.string(),
    price: joi_1.default.number(),
    quantity: joi_1.default.number(),
});
exports.userSchema = joi_1.default.object({
    userId: joi_1.default.number().integer(),
    username: joi_1.default.string(),
    password: joi_1.default.string(),
    fullName: exports.nameSchema,
    age: joi_1.default.number(),
    email: joi_1.default.string().email(),
    isActive: joi_1.default.boolean(),
    hobbies: joi_1.default.array().items(joi_1.default.string()),
    address: exports.addressSchema,
    orders: joi_1.default.array().items(orderSchema),
});
