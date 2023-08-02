import * as z from 'zod';

const postCreateSchema = z.object({
  title: z.string().nonempty('Please provide a title for your post.'),
  description: z.string().nonempty('Please provide a description for your post.'),
  tags: z.string().nonempty('Please provide at least one tag for your post'),
  // tags: z.array(z.string()).nonempty("Please provide at least one tag for your post. If you're unsure, 'general' is a good start."),
  publicPost: z.boolean().refine(value => typeof value === 'boolean', {
    message: 'Please specify whether the post is public or private.',
  }),
});

type PostCreateData = z.infer<typeof postCreateSchema>;

const postUpdateSchema = z.object({
  _id: z.string().nonempty('Post id is required'),
  title: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  publicPost: z.boolean().optional(),
});

type PostUpdateData = z.infer<typeof postUpdateSchema>;

export { postCreateSchema, postUpdateSchema, type PostUpdateData, type PostCreateData };
