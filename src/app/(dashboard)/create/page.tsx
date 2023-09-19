import { getTags } from '@/src/actions/posts';
import PostForm from '@/src/components/Forms/PostForm';

async function Page() {
  const tags = await getTags();

  return (
    <div className="bg-[#101826] lg:min-w-0 lg:flex-1">
      <PostForm tags={tags} isEditing={false} />
    </div>
  );
}

export default Page;