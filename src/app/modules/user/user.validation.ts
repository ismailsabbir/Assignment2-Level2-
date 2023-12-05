import { z } from 'zod';
// Zod Schema for name validation
const nameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});
// zod  schema for address validation
const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
// Zod schema for order validation
const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// Zod schema for the main user validation
const userValidationSchema = z.object({
  userId: z.number().int(),
  username: z.string(),
  password: z.string(),
  fullName: nameSchema,
  age: z.number(),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  orders: z.array(orderSchema).optional(),
});
// zod schema for updated full name
const nameUpdatedSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
// zod schema for updated address info
const addressUpdatedSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});
// zod schema for updated orders info
const orderUpdatedSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
});

//  Zod schema for the user updated
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
