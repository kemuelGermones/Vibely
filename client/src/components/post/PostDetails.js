import { BsPencilSquare, BsTrash } from "react-icons/bs";

import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";
import Carousel from "../ui/Carousel";
import Dropdown from "../ui/Dropdown";
import DeletePostModal from "./DeletePostModal";
import PostDetailsIcons from "./PostDetailsIcons";
import UpdatePostForm from "./UpdatePostForm";

function PostDetails({ data }) {
  const { user } = useAuth();
  const { showModal } = useModal();

  const handleShowUpdatePostForm = () => {
    showModal(<UpdatePostForm postId={data.id} caption={data.caption} />);
  };

  const handleShowDeletePostModal = () => {
    showModal(<DeletePostModal postId={data.id} />);
  };

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full"
            src={data.user.avatar.url}
            alt={data.user.username}
          />
          <div>
            <div className="font-semibold">{data.user.username}</div>
            <div className="text-sm text-gray-500">
              {`${data.user.firstname} ${data.user.lastname}`}
            </div>
          </div>
        </div>
        {data.user.id === user.uid ? (
          <Dropdown>
            <button onClick={handleShowUpdatePostForm}>
              <BsPencilSquare />
              <div>Update</div>
            </button>
            <button onClick={handleShowDeletePostModal}>
              <BsTrash />
              <div>Delete</div>
            </button>
          </Dropdown>
        ) : null}
      </div>
      <div>{data.caption}</div>
      <Carousel images={data.images} />
      <PostDetailsIcons data={data} />
    </div>
  );
}

export default PostDetails;
