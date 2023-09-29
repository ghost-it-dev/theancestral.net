'use client';
import Button from "@/src/components/Button";
import { UserInterface } from "@/src/models/User";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function ChangeEmail({ user }: { user: Omit<UserInterface, 'password'> }) {
	const [emailVisible, setEmailVisible] = useState(false);
	const [visible, setVisible] = useState(false);

	return (
		<div className="w-full flex items-center justify-between border-b border-[#1F2C37] pb-2">
			<span className="text-sm text-gray-100">Email</span>
			<div className="flex items-center gap-3">
				<span className="text-white text-sm">{emailVisible ? user.email : ('●'.repeat(user.email.length))}</span>
				<div className="flex gap-2">
					<Button onClick={() => setEmailVisible(!emailVisible)} size="square" variant="gray">
						<EyeIcon className="h-4 w-4 text-gray-100" />
					</Button>
					<Button size="square" variant="gray">
						<PencilIcon className="h-4 w-4 text-gray-100" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ChangeEmail;