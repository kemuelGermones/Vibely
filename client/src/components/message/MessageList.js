import { useInfiniteQuery } from "@tanstack/react-query";
import { BsExclamationTriangle } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";

import { getMessages } from "../../apis/message";
import useAuth from "../../hooks/useAuth";
import usePages from "../../hooks/usePages";

function Loader() {
  return (
    <div className="flex flex-col gap-3">
      <div className="ml-0 mr-auto flex w-3/5 flex-col gap-1 rounded-lg bg-white p-3">
        <div className="h-3.5 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 w-2/6 animate-pulse rounded-full bg-gray-300" />
      </div>
      <div className="ml-auto mr-0 flex w-3/5 flex-col gap-1 rounded-lg bg-yellow-400 p-3">
        <div className="h-3.5 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 w-2/6 animate-pulse rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

function Error() {
  return (
    <div className="card flex items-center gap-3">
      <BsExclamationTriangle
        className="w-10 shrink-0 text-red-500"
        size="1.5em"
      />
      <div className="flex flex-col">
        <div className="font-semibold">Something went wrong</div>
        <div className="text-sm text-gray-500">
          An error occured while trying to fetch messages.
        </div>
      </div>
    </div>
  );
}

function MessageList({ userId }) {
  const { user } = useAuth();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["users", userId, "messages"],
      queryFn: ({ pageParam = 0 }) => getMessages({ userId, page: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
    });

  const messages = usePages(data);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col-reverse gap-3"
      scrollableTarget="messageList"
      style={{ overflow: "visible" }}
      loader={<Loader />}
      inverse={true}
      dataLength={messages.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {messages.map((message) => (
        <div
          className={`${
            message.sender.id === user.uid
              ? "ml-auto mr-0 bg-yellow-400"
              : "ml-0 mr-auto bg-white"
          } max-w-3/5 rounded-lg p-3`}
          key={message.id}
        >
          {message.content}
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default MessageList;
