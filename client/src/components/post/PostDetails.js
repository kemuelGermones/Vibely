import { BsPencilSquare, BsTrash } from "react-icons/bs";

import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";
import UpdatePostForm from "./UpdatePostForm";
import DeletePostModal from "./DeletePostModal";
import PostIcons from "./PostIcons";
import Avatar from "../ui/Avatar";
import Dropdown from "../ui/Dropdown";
import Carousel from "../ui/Carousel";

function PostDetails({ data }) {
  const { user } = useAuth();
  const { openModal } = useModal();

  const showUpdatePostForm = () => {
    openModal(<UpdatePostForm postId={data.id} caption={data.caption} />);
  };

  const showDeletePostModal = () => {
    openModal(<DeletePostModal postId={data.id} />);
  };

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={data.user.avatar.url} alt={data.user.username} />
          <div>
            <div className="font-semibold">{data.user.username}</div>
            <div className="text-sm text-gray-500">
              {`${data.user.firstname} ${data.user.lastname}`}
            </div>
          </div>
        </div>
        {data.user.id === user.uid ? (
          <Dropdown>
            <button onClick={showUpdatePostForm}>
              <BsPencilSquare />
              <div>Update</div>
            </button>
            <button onClick={showDeletePostModal}>
              <BsTrash />
              <div>Delete</div>
            </button>
          </Dropdown>
        ) : null}
      </div>
      <div>{data.caption}</div>
      <Carousel images={data.images} />
      <PostIcons postId={data.id} totalComments={data.comments} />
    </div>
  );
}

export default PostDetails;
