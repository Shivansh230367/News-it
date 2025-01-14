const zod = require("zod");

const signupBody = zod.object({
  firstname: zod.string(),
  lastname: zod.string().optional(),
  email: zod.string().email(),
  password: zod.string().min(8),
  age: zod.number(),
  country: zod.string().optional(),
  interest: zod.string().optional(),
});

const signinBody = zod.object({
  email: zod.string(),
  password: zod.string(),
});

const updateBody = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().optional(),
  age: zod.number().optional(),
  country: zod.string().optional(),
  interest: zod.string().optional()
});

module.exports = {
  signupBody,
  signinBody,
  updateBody
};
