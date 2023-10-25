import { useInfiniteQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";

import { getMessages } from "../../apis/message";
import useMessages from "../../hooks/useMessages";
import MessageDetails from "./MessageDetails";

function MessageList({ userId }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["users", userId, "messages"],
      queryFn: ({ pageParam = 0 }) => getMessages({ userId, page: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
    });

  const messages = useMessages(data);

  if (isLoading || isError) {
    return (
      <div className="flex justify-center p-3">
        <AiOutlineLoading3Quarters
          className="animate-spin text-yellow-400"
          size="1.5em"
        />
      </div>
    );
  }

  return (
    <InfiniteScroll
      className="flex flex-col-reverse gap-3"
      scrollableTarget="messageList"
      style={{ overflow: "visible" }}
      loader={
        <div className="flex justify-center p-3">
          <AiOutlineLoading3Quarters
            className="animate-spin text-yellow-400"
            size="1.5em"
          />
        </div>
      }
      inverse={true}
      dataLength={messages.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {messages.map((message) => (
        <MessageDetails data={message} key={message.id} />
      ))}
    </InfiniteScroll>
  );
}

export default MessageList;
