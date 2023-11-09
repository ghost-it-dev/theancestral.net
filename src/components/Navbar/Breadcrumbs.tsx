'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

function Breadcrumbs() {
  const pathName = usePathname();
  const router = useRouter();

  // Get the current path and split it into segments
  const pathSegments = pathName.split('/').filter(p => p);

  // Always include a breadcrumb for the home page
  const breadcrumbs = [
    {
      name: 'Home',
      path: '/',
    },
  ];

  // Generate breadcrumb items for each path segment
  pathSegments.forEach((segment, index) => {
    // Shouldn't have a segment longer than 24 characters, if we do we assume its an ID and don't include it
    if (!(segment.length >= 24)) {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

      breadcrumbs.push({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        path,
      });
    }
  });

  return (
    <ol className='flex flex-row items-center gap-1'>
      {breadcrumbs.map(({ name, path }, index) => (
        <li className='flex items-center gap-1' key={path}>
          {index === breadcrumbs.length - 1 ? (
            <span className='select-none font-semibold text-gray-100'>{name}</span>
          ) : index === 1 ? (
            <button
              className='select-none font-semibold text-gray-300 transition-colors duration-300 hover:text-gray-100'
              onClick={() => router.back()}
              key={index}
            >
              {name}
            </button>
          ) : (
            <Link
              className='select-none font-semibold text-gray-300 transition-colors duration-300 hover:text-gray-100'
              href={path}
              key={index}
            >
              {name}
            </Link>
          )}
          {index < breadcrumbs.length - 1 && (
            <ChevronRightIcon className='h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
          )}
        </li>
      ))}
    </ol>
  );
}

export default Breadcrumbs;
