'use client';
import Button from '@/src/components/Button';
import ErrorMessage from '@/src/components/ErrorMessage';
import Modal from '@/src/components/Modal';
import { hasError } from '@/src/lib/response';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { deleteUserById } from '@/src/actions/user';
import { UserInterface } from '@/src/models/User';
import UpdateUserModal from '@/src/components/Forms/UpdateUserModal';

const UserActions = ({
  user,
  reqUser,
}: {
  user: Omit<UserInterface, 'password'>;
  reqUser: Omit<UserInterface, 'password'>;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleDelete = () => {
    deleteUserById(user._id).then(res => {
      if (hasError(res)) return setError(res.error);
    });
  };

  return (
    <>
      <UpdateUserModal open={showUpdateModal} setOpen={setShowUpdateModal} user={user} />
      <Modal isOpen={showDeleteModal} setIsOpen={setShowDeleteModal}>
        <div className='flex flex-col gap-2'>
          {error && <ErrorMessage className='mb-2' message={error} />}
          <span className='text-xl font-semibold text-gray-200'>Delete &quot;{user.username}&quot;</span>
          <span className='text-gray-300'>
            This is a permanent operation. The post cannot be recovered once deleted.
          </span>
          <div className='flex w-full justify-end gap-2'>
            <Button onClick={() => setShowDeleteModal(false)} variant={'gray'}>
              Cancel
            </Button>
            <Button onClick={() => handleDelete()} variant={'red'}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <div className='flex items-center justify-end gap-2'>
        {reqUser?._id === user._id ? (
          <>
            <PencilSquareIcon className='h-5 w-5 cursor-not-allowed text-gray-500' />
            <TrashIcon className='h-5 w-5 cursor-not-allowed text-gray-500' />
          </>
        ) : (
          <>
            <PencilSquareIcon
              onClick={() => setShowUpdateModal(true)}
              className='h-5 w-5 cursor-pointer text-gray-300 transition-colors hover:text-indigo-600'
            />
            <TrashIcon
              onClick={() => setShowDeleteModal(true)}
              className='h-5 w-5 cursor-pointer text-gray-300 transition-colors hover:text-red-600'
            />
          </>
        )}
      </div>
    </>
  );
};

export default UserActions;
