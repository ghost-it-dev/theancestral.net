import { ControllerRenderProps, FieldError } from 'react-hook-form';
import rehypeSanitize from 'rehype-sanitize';
import { PostCreateData } from '../app/actions/validations/posts';
import MDEditor from '@uiw/react-md-editor';
import { Label } from './Label';

interface MDInputProps {
  descriptionField: ControllerRenderProps<PostCreateData, 'description'>;
  error?: FieldError;
}

function MDInput({ descriptionField, error }: MDInputProps) {
  return (
    <>
      <Label className="mb-1" label={'Description'} />
      <MDEditor
        value={descriptionField.value}
        onChange={descriptionField.onChange}
        visibleDragbar={false}
        previewOptions={{
          rehypePlugins: [rehypeSanitize],
        }}
      />
      <p className="text-xs text-red-200 mt-0.5">{error?.message}</p>
    </>
  );
}

export default MDInput;
