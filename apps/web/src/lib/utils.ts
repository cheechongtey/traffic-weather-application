import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const paginateData = <T>(
  data: T[],
  pageNumber: number,
  itemsPerPage: number
) => {
  // Calculate the start index of the slice
  const startIndex = (pageNumber - 1) * itemsPerPage;
  // Calculate the end index of the slice
  const endIndex = startIndex + itemsPerPage;
  // Return the slice of the data
  return data.slice(startIndex, endIndex);
};

export const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number
) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return totalPages;
};

export const getPaginationRange = (currentPage: number, totalPages: number) => {
  // Calculate the range of pages to display
  let startPage = Math.max(currentPage - 1, 1);
  let endPage = Math.min(currentPage + 1, totalPages);

  if (currentPage <= 2) {
    endPage = Math.min(3, totalPages);
  } else if (currentPage >= totalPages - 1) {
    startPage = Math.max(totalPages - 2, 1);
  }

  // Generate the array of page numbers
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};
