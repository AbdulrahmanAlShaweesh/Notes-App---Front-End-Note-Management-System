import { Pagination as HeroPagination } from '@heroui/react';

function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    <HeroPagination
      showControls
      page={currentPage}
      total={totalPages}
      onChange={onPageChange}
    />
  );
}

export default Pagination;
