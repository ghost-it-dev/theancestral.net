import * as z from 'zod';

const postCreateSchema = z.object({
	title: z.string().nonempty('Title is required'),
	description: z.string().nonempty('Description is required'),
	tags: z.array(z.string()),
	publicPost: z.boolean().optional()
})

type PostCreateData = z.infer<typeof postCreateSchema>

const postUpdateSchema = z.object({
	_id: z.string().nonempty('Post id is required'),
	title: z.string().optional(),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	publicPost: z.boolean().optional()
})

type PostUpdateData = z.infer<typeof postUpdateSchema>

export { postCreateSchema, postUpdateSchema, type PostUpdateData, type PostCreateData }
