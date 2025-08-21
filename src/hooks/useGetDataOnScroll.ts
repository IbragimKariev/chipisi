import { useState, useEffect, useCallback } from 'react';
import { PaginatedFilter } from '../models/filters/paginatedFilter';

interface UseGetDataOnScrollProps<F extends PaginatedFilter> {
  initialFilter: F;
  query: (filter: F) => any;
  fetchOnMount?: boolean;
}

const useGetDataOnScroll = <T, F extends PaginatedFilter>({
  initialFilter,
  query,
  fetchOnMount = true,
}: UseGetDataOnScrollProps<F>) => {
  const [filter, setFilter] = useState<F>(initialFilter);
  const [data, setData] = useState<T[]>([]);
  const [fetching, setFetching] = useState<boolean>(fetchOnMount);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const getData = useCallback(async () => {
    try {
      const response = await query(filter).unwrap();
      const result = response.result;
      if (result) {
        setData((prevData) => [...prevData, ...result.content]);
        setTotalPages(result.totalPages);
        setTotalItems(result.totalItems);
        setCurrentPage((prevPage) => prevPage + 1);
        setFilter((prevFilter) => ({
          ...prevFilter,
          page: prevFilter.page + 1,
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetching(false);
    }
  }, [filter, query]);

  useEffect(() => {
    if (fetching) {
      getData();
    }
  }, [fetching, getData]);

  const scrollHandler = (e: any) => {
    const element = e.target;
    if (!fetching && element.scrollHeight - (element.scrollTop + element.clientHeight) < 100 && currentPage < totalPages) {
      setFetching(true);
    }
  };

  const loadData = () => {
    if (!fetching) {
      setFetching(true);
    }
  };

  return {
    filter,
    fetching,
    data,
    totalItems,
    setFilter,
    setData,
    setFetching,
    scrollHandler,
    setCurrentPage,
    loadData,
  };
};

export { useGetDataOnScroll };
