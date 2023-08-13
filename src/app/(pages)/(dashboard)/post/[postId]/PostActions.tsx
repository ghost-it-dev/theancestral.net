'use client';
import { deletePostById } from '@/src/app/actions/posts';
import { PostType } from '@/src/app/types/Post';
import Button from '@/src/components/Button';
import Modal from '@/src/components/Modal';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

const PostActions = ({ post }: { post: PostType }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal isOpen={showModal} setIsOpen={setShowModal}>
        <div className="flex flex-col gap-2">
          <span className="text-gray-200 text-xl font-semibold">Delete "{post.title}"</span>
          <span className="text-gray-300">
            This is a permanent operation. The post cannot be recovered once deleted.
          </span>
          <div className="w-full flex justify-end gap-2">
            <Button onClick={() => setShowModal(false)} variant={'gray'}>
              Cancel
            </Button>
            <Button onClick={() => deletePostById(post._id).then(res => console.log(res))} variant={'red'}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <div className="flex gap-2">
        <PencilSquareIcon className="cursor-pointer transition-colors h-5 w-5 text-gray-300 hover:text-indigo-600" />
        <TrashIcon
          onClick={() => setShowModal(true)}
          className="cursor-pointer transition-colors h-5 w-5 text-gray-300 hover:text-red-600"
        />
      </div>
    </>
  );
};

export default PostActions;
