import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import { getUser } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import UserSkeleton from "./UserSkeleton";
import UserButtonGroup from "./UserButtonGroup";
import handleError from "../../utils/handleError";

function UserDetails({ id }) {
  const { user } = useAuth();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
    onError: (error) => handleError(error),
  });

  if (isLoading || isError) {
    return <UserSkeleton />;
  }

  if (!data.items) {
    return <Navigate to="/error" />;
  }

  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 ">
              <img
                className="h-full w-full rounded-full object-cover"
                src={data.items.avatar.url}
              />
            </div>
            <div>
              <div className="font-semibold">{data.items.username}</div>
              <div className="text-sm text-gray-500">
                {`${data.items.firstname} ${data.items.lastname}`}
              </div>
            </div>
          </div>
          {user.uid === id ? <UserButtonGroup /> : null}
        </div>
        <div className="flex justify-around">
          <button>100 followers</button>
          <button>100 following</button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
