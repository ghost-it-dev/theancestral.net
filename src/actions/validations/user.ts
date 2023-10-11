import * as z from 'zod';

const userCreateSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['admin', 'user']),
});
type UserCreateData = z.infer<typeof userCreateSchema>;

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(1, 'New password is required'),
    confirmNewPassword: z.string().min(1, 'Confirm new password is required'),
  })
  .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;

export { userCreateSchema, type UserCreateData, updatePasswordSchema, type UpdatePasswordData };
