'use client';
import { useState } from 'react';
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import { Label } from '@/src/components/Label';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import { PostCreateData, postCreateSchema } from '@/src/app/actions/validations/posts';
import MDInput from '@/src/components/MDInput';

function Page() {
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PostCreateData>({ resolver: zodResolver(postCreateSchema) });
  const { field: descriptionField } = useController({
    name: 'description',
    control,
    defaultValue: '',
  });
  const { field: publicPostField } = useController({
    name: 'publicPost',
    control,
    defaultValue: false,
  });

  console.log(errors);
  const handlePostCreate = handleSubmit(data => {
    console.log(data);
    console.log(errors);
    // reset();
  });

  return (
    <div className="bg-[#101826] lg:min-w-0 lg:flex-1">
      <div className="border-b border-t border-[#1F2C37] py-4 pb-4 px-4 xl:border-t-0 xl:pt-6 h-[105px] flex items-center">
        <div className="flex flex-col flex-1">
          <h1 className="flex-1 text-gray-200 text-2xl font-medium">Create Post</h1>
          {publicPostField.value ? (
            <div onClick={() => publicPostField.onChange(!publicPostField.value)}>
              <span className="cursor-pointer flex gap-1 items-center">
                <LockOpenIcon className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300 font-semibold text-base select-none">Public</span>
              </span>
            </div>
          ) : (
            <div onClick={() => publicPostField.onChange(!publicPostField.value)}>
              <span className="cursor-pointer flex gap-1 items-center">
                <LockClosedIcon className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300 font-semibold text-base select-none">Private</span>
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handlePostCreate()}>Post</Button>
        </div>
      </div>
      <div className="px-4 my-4 xl:my-6 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Input label="Title" {...register('title')} error={errors.title} />
          <Input label="Tags" {...register('tags')} error={errors.tags} />
        </div>
        <div>
          <MDInput descriptionField={descriptionField} error={errors.description} />
        </div>
      </div>
    </div>
  );
}

export default Page;
