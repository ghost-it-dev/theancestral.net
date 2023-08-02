import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export { loginSchema, type LoginFormData };
