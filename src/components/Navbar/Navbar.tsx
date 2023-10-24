import React from 'react';
import NavbarButtons from './NavbarButtons';
import Breadcrumbs from './Breadcrumbs';
import { getUserFromSession } from '@/src/actions/user';

async function Navbar() {
  const reqUser = await getUserFromSession();

  return (
    <>
      <header className='flex-shrink-0 border-b border-[#4B5563] bg-[#1E2936]'>
        <div className='mx-auto max-w-7xl px-4 xl:px-8'>
          <div className='relative flex h-14 items-center justify-between'>
            <div className='flex flex-row items-center'>
              <Breadcrumbs />
            </div>
            <NavbarButtons user={reqUser} />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
Navbar.displayName = 'Navbar';
