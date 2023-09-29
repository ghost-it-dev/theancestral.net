'use client';
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import { PostData, postSchema } from '@/src/actions/validations/posts';
import MDInput from '@/src/components/MDInput';
import { createPost, updatePostById } from '@/src/actions/posts';
import { useState, useTransition } from 'react';
import { hasError } from '@/src/lib/hasError';
import { Label } from '../Label';
import CreatableSelect from 'react-select/creatable';
import { PostInterface } from '@/src/models/Post';

const PostForm = ({
  isEditing,
  post,
  tags,
}: {
  isEditing: boolean;
  post?: PostInterface;
  tags: PostInterface['tags'];
}) => {
  // Display this error somwhere
  const [error, setError] = useState<null | string>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostData>({ resolver: zodResolver(postSchema) });

  const { field: descriptionField } = useController({
    name: 'description',
    control,
    defaultValue: isEditing ? post?.description : '',
  });

  const { field: publicPostField } = useController({
    name: 'publicPost',
    control,
    defaultValue: isEditing ? post?.publicPost : false,
  });

  const { field: tagsField } = useController({
    name: 'tags',
    control,
    defaultValue: isEditing ? post?.tags : [],
  });

  const handlePostCreate = handleSubmit(data => {
    startTransition(() => {
      createPost(data).then(res => {
        if (hasError(res)) setError(res.error);
      });
    });
  });

  const handlePostUpdate = handleSubmit(data => {
    startTransition(() => {
      if (post?._id) {
        updatePostById(data, post._id).then(res => {
          if (hasError(res)) setError(res.error);
        });
      }
    });
  });

  return (
    <>
      <div className="border-b border-t border-[#1F2C37] py-4 pb-4 px-4 xl:border-t-0 xl:pt-6 h-[105px] flex items-center">
        <div className="flex flex-col flex-1">
          <h1 className="flex-1 text-gray-200 text-2xl font-medium">{isEditing ? 'Edit Post' : 'Create Post'}</h1>
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
          {isEditing ? (
            <Button isLoading={isPending} onClick={() => handlePostUpdate()}>
              Update
            </Button>
          ) : (
            <Button isLoading={isPending} onClick={() => handlePostCreate()}>
              Post
            </Button>
          )}
        </div>
      </div>
      <div className="px-4 my-4 xl:my-6 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Input
            defaultValue={isEditing ? post?.title : ''}
            label="Title"
            {...register('title')}
            error={errors.title}
          />
          <div>
            <Label label="Tags">
              {/* Style this */}
              {/* We should have no validations errors for this since it's not required and will always be an array */}
              <CreatableSelect
                defaultValue={isEditing ? post?.tags.map(tag => ({ value: tag, label: tag })) : []}
                onChange={data => tagsField.onChange([...data].map(({ value }) => value))}
                isMulti
                options={tags.map(tag => ({ value: tag, label: tag }))}
              />
            </Label>
          </div>
        </div>
        <div>
          <MDInput descriptionField={descriptionField} error={errors.description} />
        </div>
      </div>
    </>
  );
};

export default PostForm;
