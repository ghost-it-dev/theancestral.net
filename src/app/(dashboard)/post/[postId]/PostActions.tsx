'use client';
import { deletePostById } from '@/src/actions/posts';
import Button from '@/src/components/Button';
import ErrorMessage from '@/src/components/ErrorMessage';
import Modal from '@/src/components/Modal';
import { hasError } from '@/src/lib/response';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import Link from 'next/link';
import { PostInterface } from '@/src/models/Post';

const PostActions = ({ post }: { post: PostInterface }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleDelete = () => {
    deletePostById(post._id).then(res => {
      if (hasError(res)) return setError(res.error);
    });
  };

  return (
    <>
      <Modal isOpen={showModal} setIsOpen={setShowModal}>
        <div className='flex flex-col gap-2'>
          {error && <ErrorMessage className='mb-2' message={error} />}
          <span className='text-gray-200 text-xl font-semibold'>Delete &quot;{post.title}&quot;</span>
          <span className='text-gray-300'>
            This is a permanent operation. The post cannot be recovered once deleted.
          </span>
          <div className='w-full flex justify-end gap-2'>
            <Button onClick={() => setShowModal(false)} variant={'gray'}>
              Cancel
            </Button>
            <Button onClick={() => handleDelete()} variant={'red'}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <div className='flex gap-2'>
        <Link href={`/post/${post._id}/edit`}>
          <PencilSquareIcon className='cursor-pointer transition-colors h-5 w-5 text-gray-300 hover:text-indigo-600' />
        </Link>
        <TrashIcon
          onClick={() => setShowModal(true)}
          className='cursor-pointer transition-colors h-5 w-5 text-gray-300 hover:text-red-600'
        />
      </div>
    </>
  );
};

export default PostActions;
