import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsPersonAdd, BsPersonCheck, BsEnvelopePlus } from "react-icons/bs";
import { toast } from "react-toastify";

import { followUser, unfollowUser } from "../../apis/follow";
import useModal from "../../hooks/useModal";
import MessageModal from "../message/MessageModal";
import IconButton from "../ui/IconButton";

function UserDetailsIcons({ data }) {
  const { showModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate: mutateFollowUser, isLoading: isLoadingFollowUser } =
    useMutation(followUser, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users", data.id] });
      },
      onError: (error) => {
        toast.error(error.message, { theme: "colored" });
      },
    });

  const { mutate: mutateUnfollowUser, isLoading: isLoadingUnfollowUser } =
    useMutation(unfollowUser, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users", data.id] });
      },
      onError: (error) => {
        toast.error(error.message, { theme: "colored" });
      },
    });

  const handleFollowOrUnfollowUser = () => {
    if (data.isFollowed) {
      mutateUnfollowUser(data.id);
    } else {
      mutateFollowUser(data.id);
    }
  };

  const handleShowMessageModal = () => {
    const { id, firstname, lastname, username, email, avatar, createdAt } =
      data;
    showModal(
      <MessageModal
        data={{ id, firstname, lastname, username, email, avatar, createdAt }}
      />
    );
  };

  return (
    <div className="flex gap-3">
      <IconButton
        content={data.isFollowed ? "Unfollow" : "Follow"}
        onClick={handleFollowOrUnfollowUser}
        disabled={isLoadingFollowUser || isLoadingUnfollowUser}
      >
        {data.isFollowed ? (
          <BsPersonCheck size="1.5em" />
        ) : (
          <BsPersonAdd size="1.5em" />
        )}
      </IconButton>
      <IconButton content="Message" onClick={handleShowMessageModal}>
        <BsEnvelopePlus size="1.5em" />
      </IconButton>
    </div>
  );
}

export default UserDetailsIcons;
