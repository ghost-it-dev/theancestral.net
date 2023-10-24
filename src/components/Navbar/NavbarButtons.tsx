'use client';
import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import UserDropdown from './UserDropdown';
import Button from '../Button';
import dynamic from 'next/dynamic';
import { UserInterface } from '@/src/models/User';
import Modal from '../Modal';
const AuthModal = dynamic(() => import('@/src/components/Forms/AuthModal'));

function NavbarButtons({ user }: { user: Omit<UserInterface, 'password'> | null }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <AuthModal isOpen={authOpen} setIsOpen={setAuthOpen} />
      <Modal isOpen={searchOpen} setIsOpen={setSearchOpen}>
        <span className='text-xl font-semibold text-white'>Search for a user or post</span>
      </Modal>
      <div className='flex flex-row gap-3'>
        {/* <div className='flex cursor-pointer items-center justify-center rounded-full bg-[#364150] p-2 transition-all ease-linear hover:bg-[#465160]'>
          <MagnifyingGlassIcon
            onClick={() => setSearchOpen(!searchOpen)}
            className='h-5 w-5 text-gray-200'
            aria-hidden='true'
          />
        </div> */}
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <Button onClick={() => setAuthOpen(true)} variant={'gray'}>
            Login
          </Button>
        )}
      </div>
    </>
  );
}

export default NavbarButtons;
NavbarButtons.displayName = 'NavbarButtons';
