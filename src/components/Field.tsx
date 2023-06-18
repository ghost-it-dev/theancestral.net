import { forwardRef } from 'react';
import { Field as FormikField, FieldProps } from 'formik';
import Input from './Input';

interface OwnProps {
	name: string;
	label?: string;
}

type Props = OwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>;

const Field = forwardRef<HTMLInputElement, Props>(({ id, name, label, ...props }, ref) => (
	<FormikField innerRef={ref} name={name}>
		{
			({ field, form: { errors, touched } }: FieldProps) => (
				<div>
					<Input
						autoComplete='off'
						id={id}
						label={label}
						{...field}
						{...props}
					/>
					{touched[field.name] && errors[field.name] && (
						<p className={'text-red-200 text-sm mt-0.5'}>
							{errors[field.name] as string}
						</p>
					)}
				</div>
			)
		}
	</FormikField>
));
Field.displayName = 'Field';

export default Field;