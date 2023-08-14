import PostCreate from '@/src/app/components/Forms/PostForm';

function Page() {
  return (
    <div className="bg-[#101826] lg:min-w-0 lg:flex-1">
      <PostCreate isEditing={false} />
    </div>
  );
}

export default Page;
