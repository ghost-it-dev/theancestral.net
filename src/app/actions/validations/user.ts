import * as z from 'zod';

const userCreateSchema = z.object({
	email: z.string().email('Invalid email address').nonempty('Email is required'),
	name: z.string().nonempty('Name is required'),
	username: z.string().nonempty('Username is required'),
	password: z.string().nonempty('Password is required'),
	role: z.enum(['admin', 'user'])
})

type UserCreateData = z.infer<typeof userCreateSchema>


export { userCreateSchema, type UserCreateData }