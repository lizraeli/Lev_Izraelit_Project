import { useState, useMemo } from 'react';

export function usePaginationRange<T>(items: T[], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(0);

  const currentItems = useMemo(
    () =>
      items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
    [items, currentPage, itemsPerPage]
  );

  const pageCount = useMemo(
    () => Math.floor(items.length / itemsPerPage),
    [items, itemsPerPage]
  );

  return { currentItems, currentPage, setCurrentPage, pageCount };
}
