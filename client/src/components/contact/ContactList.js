import { useInfiniteQuery } from "@tanstack/react-query";
import { BsExclamationTriangle } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";

import { getContacts } from "../../apis/contact";
import usePages from "../../hooks/usePages";
import ContactDetails from "./ContactDetails";

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
    <div className="flex items-center gap-3 p-3">
      <BsExclamationTriangle
        className="w-10 shrink-0 text-red-500"
        size="1.5em"
      />
      <div className="flex w-full flex-col">
        <div className="font-semibold">Something went wrong</div>
        <div className="text-sm text-gray-500">
          An error occured while trying to fetch users.
        </div>
      </div>
    </div>
  );
}

function ContactList() {
  const { fetchNextPage, hasNextPage, data, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["contacts"],
      queryFn: ({ pageParam = 0 }) => getContacts({ page: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
    });

  const contacts = usePages(data);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col"
      scrollableTarget="contactList"
      style={{ overflow: "visible" }}
      loader={<Loader />}
      dataLength={contacts.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {contacts.map((contact) => (
        <ContactDetails data={contact} key={contact.id} />
      ))}
    </InfiniteScroll>
  );
}

export default ContactList;
