'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const Breadcrumbs = () => {
	const pathName = usePathname();

	// Get the current path and split it into segments
	const pathSegments = pathName.split('/').filter((p) => p);

	// Always include a breadcrumb for the home page
	const breadcrumbs = [
		{
			name: 'Home',
			path: '/',
		},
	];

	// Generate breadcrumb items for each path segment
	pathSegments.forEach((segment, index) => {
		// Check if the segment looks like an ID (e.g., it's a 24-character hexadecimal string)
		const isId = /^[0-9a-fA-F]{24}$/.test(segment);

		if (!isId) {
			const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

			breadcrumbs.push({
				name: segment.charAt(0).toUpperCase() + segment.slice(1),
				path,
			});
		}
	});

	return (
		<ol className='gap-1 flex flex-row items-center'>
			{breadcrumbs.map(({ name, path }, index) => (
				<>
					{index === breadcrumbs.length - 1 ? (
						<span className='text-gray-100 font-semibold'>{name}</span>
					) : (
						<Link
							className='font-semibold transition-colors duration-300 text-gray-300 hover:text-gray-100'
							href={path}
							key={index}
						>
							{name}
						</Link>
					)}
					{index < breadcrumbs.length - 1 &&
						<ChevronRightIcon className='h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
					}
				</>
			))}
		</ol>
	);
};

export default Breadcrumbs;