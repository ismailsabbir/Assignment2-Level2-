"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdatedValidationSchema = void 0;
const zod_1 = require("zod");
// Zod Schema for name validation
const nameSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
// zod  schema for address validation
const addressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
// Zod schema for order validation
const orderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
// Zod schema for the main user validation
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: nameSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email({
        message: 'Invalid email address',
    }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressSchema,
    orders: zod_1.z.array(orderSchema).optional(),
});
// zod schema for updated full name
const nameUpdatedSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
// zod schema for updated address info
const addressUpdatedSchema = zod_1.z.object({
    street: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
});
// zod schema for updated orders info
const orderUpdatedSchema = zod_1.z.object({
    productName: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    quantity: zod_1.z.number().optional(),
});
//  Zod schema for the user updated
exports.userUpdatedValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().int().optional(),
    username: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    fullName: nameUpdatedSchema.optional(),
    age: zod_1.z.number().optional(),
    email: zod_1.z.string().email().optional(),
    isActive: zod_1.z.boolean().optional(),
    hobbies: zod_1.z.array(zod_1.z.string()).optional(),
    address: addressUpdatedSchema.optional(),
    orders: zod_1.z.array(orderUpdatedSchema).optional(),
});
exports.default = userValidationSchema;
