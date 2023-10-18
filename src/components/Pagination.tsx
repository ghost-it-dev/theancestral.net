'use client';
import Link from 'next/link';
import Button from './Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const pathname = usePathname();
  const renderPaginationLinks = () => {
    const links = [];
    const startPage = currentPage > 1 ? currentPage - 1 : 1;
    const endPage = currentPage < totalPages - 1 ? currentPage + 1 : totalPages;

    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <Link key={i} href={`${pathname}/?page=${i}`}>
          <Button disabled={currentPage === i} size='pagination' variant='gray' className='select-none'>
            {i}
          </Button>
        </Link>,
      );
    }

    return links;
  };

  return (
    <div className='my-5 flex justify-center gap-1'>
      {currentPage > 1 && (
        <Link href={`${pathname}/?page=${currentPage - 1}`}>
          <Button size='pagination' variant='gray' className='select-none'>
            <ChevronLeftIcon className='h-5 w-5' />
          </Button>
        </Link>
      )}
      {renderPaginationLinks()}
      {currentPage < totalPages && (
        <Link href={`${pathname}/?page=${currentPage + 1}`}>
          <Button size='pagination' variant='gray' className='select-none'>
            <ChevronRightIcon className='h-5 w-5' />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
