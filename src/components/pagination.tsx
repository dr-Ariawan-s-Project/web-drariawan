import { useMemo } from 'react';

import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { generatePagesToDisplay } from '@/utils/formatter';
import { Meta } from '@/utils/types/api';

interface Props {
  meta?: Meta;
}

const Pagination = (props: Props) => {
  const { meta } = props;

  const pagesToDisplay = useMemo(
    () => generatePagesToDisplay(meta?.currentPage!, meta?.totalPages!),
    [meta]
  );

  return (
    <PaginationUI>
      <PaginationContent>
        <PaginationPrevious
          href={
            meta
              ? meta?.currentPage === 1
                ? undefined
                : `?page=${meta?.currentPage! - 1}`
              : undefined
          }
        />
        {meta ? (
          pagesToDisplay.map((page) => {
            if (page === '...') {
              return <PaginationEllipsis />;
            }

            return (
              <PaginationLink
                key={page}
                href={meta?.currentPage === page ? undefined : `?page=${page}`}
                isActive={meta?.currentPage === page}
              >
                {page}
              </PaginationLink>
            );
          })
        ) : (
          <PaginationEllipsis />
        )}
        <PaginationNext
          href={
            meta
              ? meta?.currentPage === meta?.totalPages
                ? undefined
                : `?page=${meta?.currentPage! + 1}`
              : undefined
          }
        />
      </PaginationContent>
    </PaginationUI>
  );
};

export default Pagination;
