'use client';
import Button from "@/src/components/Button";
import ChangePasswordModal from "@/src/components/Forms/ChangePasswordModal";
import { UserInterface } from "@/src/models/User";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function ChangePassword({ user }: { user: Omit<UserInterface, 'password'> }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<ChangePasswordModal user={user} open={open} setOpen={setOpen} />
			<div className="w-full flex items-center justify-between">
				<span className="text-sm text-gray-100">Password</span>
				<div className="flex items-center gap-3">
					<span className="text-white text-sm">●●●●●●</span>
					<div className="flex gap-2">
						<Button size="square" variant="gray">
							<PencilIcon onClick={() => setOpen(!open)} className="h-4 w-4 text-gray-100" />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;