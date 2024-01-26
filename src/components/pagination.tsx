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
import { IPagination } from '@/utils/types/api';

interface Props {
  meta?: IPagination;
}

const Pagination = (props: Props) => {
  const { meta } = props;

  const pagesToDisplay = useMemo(
    () => generatePagesToDisplay(meta?.page!, meta?.total_pages!),
    [meta]
  );

  return (
    <PaginationUI>
      <PaginationContent>
        <PaginationPrevious
          href={
            meta
              ? meta?.page === 1
                ? undefined
                : `?page=${meta?.page! - 1}`
              : undefined
          }
        />
        {meta ? (
          pagesToDisplay.map((page, index) => {
            if (page === '...') {
              return <PaginationEllipsis key={`${page}-${index}`} />;
            }

            return (
              <PaginationLink
                key={`${page}-${index}`}
                href={meta?.page === page ? undefined : `?page=${page}`}
                isActive={meta?.page === page}
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
              ? meta?.page === meta?.total_pages
                ? undefined
                : `?page=${meta?.page! + 1}`
              : undefined
          }
        />
      </PaginationContent>
    </PaginationUI>
  );
};

export default Pagination;
