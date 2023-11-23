"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.addressSchema = exports.nameSchema = void 0;
const mongoose_1 = require("mongoose");
exports.nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    }
});
exports.addressSchema = new mongoose_1.Schema({
    street: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    }
});
const userschema = new mongoose_1.Schema({
    userId: { type: Number, unique: true },
    username: {
        type: String, unique: true
    },
    password: {
        type: String
    },
    fullName: {
        type: exports.nameSchema
    },
    age: { type: Number },
    email: { type: String },
    isActive: {
        type: Boolean
    },
    hobbies: {
        type: [String]
    },
    address: {
        type: exports.addressSchema
    },
    orders: {
        productName: {
            type: String
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        }
    }
});
exports.UserModel = (0, mongoose_1.model)('student', userschema);
