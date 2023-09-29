'use client';
import { invalidateSessionById } from '@/src/actions/user';
import Button from '@/src/components/Button';
import { hasError } from '@/src/lib/hasError';
import { useState, useTransition } from 'react';

// Make this work with objectIDs
const LogoutSession = ({ sessionId }: { sessionId: string }) => {
	const [error, setError] = useState<null | string>(null);
	const [isPending, startTransition] = useTransition();

	const handleLogoutSession = () => {
		startTransition(() => {
			invalidateSessionById(sessionId).then(res => {
				if (hasError(res)) setError(res.error);
			});
		});
	};

	return (
		<Button onClick={() => handleLogoutSession()} isLoading={isPending} variant='red'>
			Logout
		</Button>
	)
};

export default LogoutSession;