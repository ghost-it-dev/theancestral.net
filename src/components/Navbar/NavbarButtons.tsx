'use client';
import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import UserDropdown from './UserDropdown';
import Button from '../Button';
import dynamic from 'next/dynamic';
import { UserInterface } from '@/src/models/User';
const AuthModal = dynamic(() => import('@/src/components/Forms/AuthModal'));

function NavbarButtons({ user }: { user: Omit<UserInterface, 'password'> | null }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AuthModal open={open} setOpen={setOpen} />
      <div className="flex flex-row gap-3">
        <div className="p-2 cursor-pointer flex items-center justify-center rounded-full bg-[#364150] hover:bg-[#465160] transition-all ease-linear">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-200" aria-hidden="true" />
        </div>
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <Button onClick={() => setOpen(true)} variant={'gray'}>
            Login
          </Button>
        )}
      </div>
    </>
  );
}

export default NavbarButtons;
NavbarButtons.displayName = 'NavbarButtons';
