import * as z from 'zod';

const userCreateSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  name: z.string().nonempty('Name is required'),
  username: z.string().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
  role: z.enum(['admin', 'user']),
});
type UserCreateData = z.infer<typeof userCreateSchema>;

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty('Current password is required'),
    newPassword: z.string().nonempty('New password is required'),
    confirmNewPassword: z.string().nonempty('Confirm new password is required'),
  })
  .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;

export { userCreateSchema, type UserCreateData, updatePasswordSchema, type UpdatePasswordData };
