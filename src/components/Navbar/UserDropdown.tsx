'use client'

import { Menu, Transition } from "@headlessui/react";
import classNames from 'classnames';
import { Fragment, useTransition } from "react";
import Image from 'next/image';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
import { Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline'
import { logout } from "@/src/app/actions/auth";
import Link from "next/link";

function UserDropdown() {
	const [isPending, startTransition] = useTransition();

	const handleLogout = () => {
		startTransition(() => {
			logout()
		});
	}

	return (
		<Menu as="div" className="relative flex-shrink-0">
			<div>
				<Menu.Button className="flex">
					<span className="sr-only">Open user menu</span>
					<Image src={'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} alt='avatar' width={36} height={36} className='rounded-full cursor-pointer' />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-150"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-150"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#4B5563] py-1 shadow-xl">
					<Menu.Item>
						{({ active }) => (
							<a
								href="#"
								className={classNames(
									active ? 'bg-[#1E2936]' : '',
									'flex items-center gap-1 px-4 py-2 text-sm text-gray-200 transition-colors font-semibold'
								)}
							>
								<UserIcon className='h-5 w-5' /> View Profile
							</a>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<Link
								href='/settings'
								className={classNames(
									active ? 'bg-[#1E2936]' : '',
									'flex items-center gap-1 px-4 py-2 text-sm text-gray-200 transition-colors border-t border-[#1E2936] font-semibold'
								)}
							>
								<Cog6ToothIcon className='h-5 w-5' /> Settings
							</Link>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<span
								onClick={() => handleLogout()}
								className={classNames(
									active ? 'bg-[#1E2936]' : '',
									'flex items-center gap-1 px-4 py-2 text-sm text-gray-200 transition-colors border-t border-[#1E2936] font-semibold cursor-pointer'
								)}
							>
								<ArrowRightOnRectangleIcon className='h-5 w-5' /> Logout
							</span>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default UserDropdown;