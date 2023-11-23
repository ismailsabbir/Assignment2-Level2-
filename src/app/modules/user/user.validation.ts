import Joi from 'joi';
export const nameSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
});

export const addressSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
});
const orderSchema = Joi.object({
  productName: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number(),
});

export const userSchema = Joi.object({
  userId: Joi.number().integer(),
  username: Joi.string(),
  password: Joi.string(),
  fullName: nameSchema,
  age: Joi.number(),
  email: Joi.string().email(),
  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string()),
  address: addressSchema,
  orders: Joi.array().items(orderSchema),
});
