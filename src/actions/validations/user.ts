import * as z from 'zod';

const userCreateOrUpdateSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['admin', 'user']),
});
type UserCreateOrUpdateData = z.infer<typeof userCreateOrUpdateSchema>;

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

export { userCreateOrUpdateSchema, type UserCreateOrUpdateData, updatePasswordSchema, type UpdatePasswordData };
