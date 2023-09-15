import { useQuery } from "@tanstack/react-query";
import { BsExclamationTriangle } from "react-icons/bs";

import { getUser } from "../../apis/user";
import useAuth from "../../hooks/useAuth";
import UserDetailsIcons from "./UserDetailsIcons";
import Avatar from "../ui/Avatar";

function Loader() {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-300" />
        <div className="flex w-full flex-col gap-1">
          <div className="h-3.5 w-1/4 animate-pulse rounded-full bg-gray-300" />
          <div className="h-3.5 w-2/6 animate-pulse rounded-full bg-gray-300" />
        </div>
      </div>
      <div className="flex justify-around">
        <div className="h-3.5 w-2/6 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 w-2/6 animate-pulse rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

function Error() {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <BsExclamationTriangle
          className="w-10 shrink-0 text-red-500"
          size="1.5em"
        />
        <div className="flex flex-col">
          <div className="font-semibold">Something went wrong</div>
          <div className="text-sm text-gray-500">
            An error occured while trying to fetch user details.
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDetails({ userId }) {
  const { user } = useAuth();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={data.avatar.url} alt={data.username} />
          <div>
            <div className="font-semibold">{data.username}</div>
            <div className="text-sm text-gray-500">
              {`${data.firstname} ${data.lastname}`}
            </div>
          </div>
        </div>
        {data.id !== user.uid ? <UserDetailsIcons data={data} /> : null}
      </div>
      <div className="flex justify-around">
        <div>{`${data.followers} followers`}</div>
        <div>{`${data.following} following`}</div>
      </div>
    </div>
  );
}

export default UserDetails;
