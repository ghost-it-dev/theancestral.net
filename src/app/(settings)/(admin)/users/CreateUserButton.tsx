'use client';
import Button from '@/src/components/Button';
import CreateUserModal from '@/src/components/Forms/CreateUserModal';
import { useState } from 'react';

function CreateUserButton() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<CreateUserModal open={open} setOpen={setOpen} />
			<Button onClick={() => setOpen(!open)}>
				Create User
			</Button>
		</>
	);
}

export default CreateUserButton;
