import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getPaginationRange } from '@/lib/utils';
import React, { useMemo, useState } from 'react';

export function CustomPagination({
  activeIndex,
  totalPages,
  onChangePage,
}: {
  activeIndex: number;
  totalPages: number;
  onChangePage: (index: number) => void;
}) {
  const visiblePagesArr = useMemo(() => {
    return getPaginationRange(activeIndex, totalPages);
  }, [totalPages, activeIndex]);

  const onPageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    e.preventDefault();
    onChangePage(index);
  };

  const onPrev = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onChangePage(activeIndex === 1 ? activeIndex : activeIndex - 1);
  };

  const onNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onChangePage(activeIndex === totalPages ? activeIndex : activeIndex + 1);
  };

  return (
    <Pagination>
      <PaginationContent className='justify-end'>
        <PaginationItem className='hidden sm:block'>
          <PaginationPrevious onClick={onPrev} />
        </PaginationItem>
        {visiblePagesArr.map((x) => (
          <PaginationItem key={`pagination_${x}`}>
            <PaginationLink
              onClick={(e) => onPageClick(e, x)}
              isActive={x === activeIndex}
            >
              {x}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem className='hidden sm:block'>
          <PaginationNext onClick={onNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
