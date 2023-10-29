import * as z from 'zod';

const createUserSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['admin', 'user']),
});
type CreateUserData = z.infer<typeof createUserSchema>;

const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string(),
  role: z.enum(['admin', 'user']),
});
type UpdateUserData = z.infer<typeof createUserSchema>;

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

export { createUserSchema, type CreateUserData, updateUserSchema, type UpdateUserData, updatePasswordSchema, type UpdatePasswordData };
