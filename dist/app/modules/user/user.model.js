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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.orderschema = exports.addressSchema = exports.nameSchema = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
exports.nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
});
exports.addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
});
exports.orderschema = new mongoose_1.Schema({
    productName: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
});
const userschema = new mongoose_1.Schema({
    userId: {
        type: Number,
        // unique: true,
    },
    username: {
        type: String,
        // unique: true,
    },
    password: {
        type: String,
    },
    fullName: {
        type: exports.nameSchema,
    },
    age: { type: Number },
    email: { type: String },
    isActive: {
        type: Boolean,
    },
    hobbies: {
        type: [String],
    },
    address: {
        type: exports.addressSchema,
    },
    orders: {
        type: [exports.orderschema],
    },
});
userschema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt));
        next();
    });
});
userschema.post('save', function (doco, next) {
    doco.password = '';
    next();
});
userschema.statics.isuserExit = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const exituser = exports.UserModel.findOne({ userId: id });
        return exituser;
    });
};
// userschema.pre('save',async function(next){
//   const isUserIdExist=await UserModel.find({userId:this.userId});
//   if(isUserIdExist){
//     throw new Error('Already Exist');
//   }
//   next();
// })
exports.UserModel = (0, mongoose_1.model)('users', userschema);
