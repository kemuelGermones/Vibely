import { useQuery } from "@tanstack/react-query";

import { getUser } from "../../apis/user";
import useAuth from "../../hooks/useAuth";
import UserDetailsIcons from "./UserDetailsIcons";
import UserDetailsSkeleton from "./UserDetailsSkeleton";

function UserDetails({ userId }) {
  const { user } = useAuth();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    refetchInterval: 10000,
  });

  if (isLoading || isError) {
    return <UserDetailsSkeleton />;
  }

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full"
            src={data.avatar.url}
            alt={data.username}
          />
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
