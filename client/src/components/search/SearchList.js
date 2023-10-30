import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { getUsers } from "../../apis/user";
import usePages from "../../hooks/usePages";
import SearchDetails from "./SearchDetails";
import SearchDetailsSkeleton from "./SearchDetailsSkeleton";

function SearchList({ username }) {
  const { fetchNextPage, hasNextPage, data, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["users", { search: username }],
      queryFn: ({ pageParam = 0 }) =>
        getUsers({ page: pageParam, search: username }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
    });

  const users = usePages(data);

  if (isLoading || isError) {
    return <SearchDetailsSkeleton />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col"
      scrollableTarget="searchList"
      style={{ overflow: "visible" }}
      loader={<SearchDetailsSkeleton />}
      dataLength={users.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {users.map((user) => (
        <SearchDetails data={user} key={user.id} />
      ))}
    </InfiniteScroll>
  );
}

export default SearchList;
