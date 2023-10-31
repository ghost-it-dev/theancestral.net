import { ControllerRenderProps, FieldError } from 'react-hook-form';
import rehypeSanitize from 'rehype-sanitize';
import MDEditor from '@uiw/react-md-editor';
import { Label } from '@/src/components/Label';
import { PostData } from '@/src/actions/validations/posts';

interface MDInputProps {
  descriptionField: ControllerRenderProps<PostData, 'description'>;
  error?: FieldError;
}

function MDInput({ descriptionField, error }: MDInputProps) {
  return (
    <>
      <Label className='mb-1' label={'Description'} />
      <MDEditor
        value={descriptionField.value}
        onChange={descriptionField.onChange}
        visibleDragbar={false}
        previewOptions={{
          rehypePlugins: [rehypeSanitize],
        }}
      />
      <p className='mt-0.5 text-xs text-red-200'>{error?.message}</p>
    </>
  );
}

export default MDInput;
