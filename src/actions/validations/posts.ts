import * as z from 'zod';

const postSchema = z.object({
  title: z.string().min(1, 'Please provide a title for your post.'),
  description: z.string().min(1, 'Please provide a description for your post.'),
  tags: z.array(z.string()),
  publicPost: z.boolean(),
});

type PostData = z.infer<typeof postSchema>;

export { postSchema, type PostData };
