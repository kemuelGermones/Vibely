import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { getContacts } from "../../apis/client";
import usePages from "../../hooks/usePages";
import ContactDetails from "./ContactDetails";
import ContactDetailsSkeleton from "./ContactDetailsSkeleton";

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

  if (isLoading || isError) {
    return <ContactDetailsSkeleton />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col"
      scrollableTarget="contactList"
      style={{ overflow: "visible" }}
      loader={<ContactDetailsSkeleton />}
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
