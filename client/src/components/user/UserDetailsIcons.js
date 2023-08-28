import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsPersonAdd, BsPersonCheck, BsEnvelopePlus } from "react-icons/bs";

import { followUser, unfollowUser } from "../../apis/user";
import IconButton from "../ui/IconButton";
import handleError from "../../utils/handleError";

function UserDetailsIcons({ userId, isFollowed }) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    isFollowed ? unfollowUser : followUser,
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["users", userId] });
      },
      onError: (error, variables, context) => {
        handleError(error);
      },
    }
  );

  const handleFollowOrUnfollowUser = () => {
    mutate(userId);
  };

  return (
    <div className="flex gap-3">
      <IconButton
        content={isFollowed ? "Unfollow" : "Follow"}
        onClick={handleFollowOrUnfollowUser}
        disabled={isLoading}
      >
        {isFollowed ? (
          <BsPersonCheck size="1.5em" />
        ) : (
          <BsPersonAdd size="1.5em" />
        )}
      </IconButton>
      <IconButton content="Message">
        <BsEnvelopePlus size="1.5em" />
      </IconButton>
    </div>
  );
}

export default UserDetailsIcons;