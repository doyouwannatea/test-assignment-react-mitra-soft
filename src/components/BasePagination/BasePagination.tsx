import { usePagination } from '@/hooks/usePagination';
import { range } from '@/utils/shared';
import { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';

type Props = {
  maxItems: number;
  currentPage: number;
  itemsPerPage: number;
  pageNeighbours: number;
  onPageChange: (page: number) => void;
};

function BasePagination({
  currentPage,
  maxItems,
  itemsPerPage,
  pageNeighbours,
  onPageChange,
}: Props) {
  const { next, prev, jump, maxPage } = usePagination(
    currentPage,
    maxItems,
    itemsPerPage,
    onPageChange,
  );

  // частично взял отсюда
  // https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react-ru
  const paginationItems = useMemo(() => {
    const startPage = Math.max(1, currentPage - pageNeighbours);
    const endPage = Math.min(maxPage, currentPage + pageNeighbours);
    const pages = range(startPage, endPage);
    /**
     * hasLeftSpill: has hidden pages to the left
     * hasRightSpill: has hidden pages to the right
     */
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = maxPage - endPage > 1;

    const pageItems = pages.map((page) => {
      return (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => jump(page)}
        >
          {page}
        </Pagination.Item>
      );
    });

    return (
      <>
        {hasLeftSpill && <Pagination.Ellipsis />}
        {pageItems}
        {hasRightSpill && <Pagination.Ellipsis />}
      </>
    );
  }, [currentPage, pageNeighbours, maxPage, jump]);

  return (
    <Pagination>
      <Pagination.First onClick={() => jump(1)} />
      <Pagination.Prev onClick={prev} />
      {paginationItems}
      <Pagination.Next onClick={next} />
      <Pagination.Last onClick={() => jump(maxPage)} />
    </Pagination>
  );
}

export default BasePagination;
