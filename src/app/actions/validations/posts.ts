import * as z from 'zod';

const postSchema = z.object({
  title: z.string().nonempty('Please provide a title for your post.'),
  description: z.string().nonempty('Please provide a description for your post.'),
  tags: z.array(z.string().nonempty("Please provide at least one tag for your post.")),
  publicPost: z.boolean(),
});

type PostData = z.infer<typeof postSchema>;

export { postSchema, type PostData };
