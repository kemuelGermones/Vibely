import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../store/auth-context";
import { getUser } from "../../api/user";
import UserSkeleton from "./UserSkeleton";
import UserButtonGroup from "./UserButtonGroup";
import handleError from "../../utils/handleError";

function User() {
  const { user } = useContext(AuthContext);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["users", user.uid],
    queryFn: () => getUser(user.uid),
    onError: (error) => handleError(error),
  });

  if (isLoading || isError) {
    return <UserSkeleton />;
  }

  return data ? (
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
          <UserButtonGroup />
        </div>
        <div className="flex justify-around">
          <button>100 followers</button>
          <button>100 following</button>
        </div>
      </div>
    </div>
  ) : null;
}

export default User;
