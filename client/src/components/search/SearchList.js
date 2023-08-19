import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BsExclamationTriangle } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";

import { getUsers } from "../../api/user";
import SearchItem from "./SearchItem";

function Loader() {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-300" />
      <div className="flex w-full flex-col gap-1">
        <div className="h-3.5 w-1/4 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 w-2/6 animate-pulse rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

function Error() {
  return (
    <div className="flex items-center gap-3 p-3 [&>*:nth-child(2)]:grow">
      <BsExclamationTriangle
        className="w-10 shrink-0 text-red-500"
        size="1.5em"
      />
      <div className="flex flex-col">
        <div className="font-semibold">Something went wrong</div>
        <div className="text-sm text-gray-500">
          An error occured while trying to fetch users.
        </div>
      </div>
    </div>
  );
}

function SearchList({ search }) {
  const { fetchNextPage, hasNextPage, data, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["users", { search }],
      queryFn: ({ pageParam = 0 }) => {
        if (search) {
          return getUsers({ page: pageParam, search });
        }
        return [];
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
    });

  const users = useMemo(() => {
    let result = [];
    if (data) {
      data.pages.forEach((page) => {
        result = result.concat(page);
      });
    }
    return result;
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col"
      scrollableTarget="users"
      loader={<Loader />}
      style={{ overflow: "visible" }}
      dataLength={users.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {users.map((user) => (
        <SearchItem data={user} key={user.id} />
      ))}
    </InfiniteScroll>
  );
}

export default SearchList;
