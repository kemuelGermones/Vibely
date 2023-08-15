import { useQuery } from "@tanstack/react-query";

import { getUser } from "../../api/user";
import LoadUser from "./LoadUser";
import UserButtons from "./UserButtons";
import ErrorUser from "./ErrorUser";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import Header from "../ui/Header";

function User({ userId }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
  });

  if (isLoading) {
    return <LoadUser />;
  }

  if (isError) {
    return <ErrorUser />;
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={data.items.avatar.url} />
          <Header
            username={data.items.username}
            fullname={`${data.items.firstname} ${data.items.lastname}`}
          />
        </div>
        <UserButtons />
      </div>
      <div className="flex justify-around">
        <button>100 followers</button>
        <button>100 following</button>
      </div>
    </Card>
  );
}

export default User;
