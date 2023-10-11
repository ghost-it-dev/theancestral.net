import { getUserById } from '@/src/actions/user';
import ErrorMessage from '@/src/components/ErrorMessage';
import { hasError } from '@/src/lib/response';
import { UserInterface } from '@/src/models/User';

interface PageProps {
  params: { userId: UserInterface['_id'] };
}

async function Page({ params }: PageProps) {
  const user = await getUserById(params.userId);

  if (hasError(user)) {
    return <ErrorMessage message={user.error} />;
  }

  return <div className='bg-[#101826] lg:min-w-0 lg:flex-1'>{user.name}</div>;
}

export default Page;
