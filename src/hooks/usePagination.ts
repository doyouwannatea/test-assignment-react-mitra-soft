import { noop } from '@/utils/shared';

// https://dev.to/admantium/react-creating-a-custom-hook-for-pagination-jni
export function usePagination(
  currentPage: number,
  maxItems: number,
  itemsPerPage: number,
  onPageChange: (page: number) => void = noop,
) {
  const maxPage = Math.ceil(maxItems / itemsPerPage);

  function next() {
    onPageChange(Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    onPageChange(Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    onPageChange(Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentPage, maxPage };
}
