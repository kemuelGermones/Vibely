import { useQuery } from "@tanstack/react-query";

import { getUser } from "../../api/user";
import UserLoader from "./UserLoader";
import UserIcons from "./UserIcons";
import UserError from "./UserError";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";

function User({ userId }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
  });

  if (isLoading) {
    return <UserLoader />;
  }

  if (isError) {
    return <UserError />;
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={data.items.avatar.url} />
          <div>
            <div className="font-semibold">{data.items.username}</div>
            <div className="text-sm text-gray-500">
              {`${data.items.firstname} ${data.items.lastname}`}
            </div>
          </div>
        </div>
        <UserIcons />
      </div>
      <div className="flex justify-around">
        <button>100 followers</button>
        <button>100 following</button>
      </div>
    </Card>
  );
}

export default User;
