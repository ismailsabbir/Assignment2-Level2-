import { z } from 'zod';

const nameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// Define the Zod schema for the main type
const userValidationSchema = z.object({
  userId: z.number().int(),
  username: z.string(),
  password: z.string(),
  fullName: nameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  orders: z.array(orderSchema),
});
const nameUpdatedSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const addressUpdatedSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const orderUpdatedSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
});

// Define the Zod schema for the main type
export const userUpdatedValidationSchema = z.object({
  userId: z.number().int().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: nameUpdatedSchema.optional(),
  age: z.number().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: addressUpdatedSchema.optional(),
  orders: z.array(orderUpdatedSchema).optional(),
});
export default userValidationSchema;
