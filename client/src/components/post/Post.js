import { BsThreeDots, BsXLg } from "react-icons/bs";

import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";
import UpdatePostForm from "./UpdatePostForm";
import DeletePostModal from "./DeletePostModal";
import PostIcons from "./PostIcons";
import IconButton from "../ui/IconButton";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import Carousel from "../ui/Carousel";

function Post({ data }) {
  const { user } = useAuth();
  const { openModal } = useModal();

  const showUpdatePostForm = () => {
    openModal(<UpdatePostForm postId={data.id} caption={data.caption} />);
  };

  const showDeletePostModal = () => {
    openModal(<DeletePostModal postId={data.id} />);
  };

  const updateButton = (
    <IconButton content="Update" onClick={showUpdatePostForm}>
      <BsThreeDots size="1.5em" />
    </IconButton>
  );

  const deleteButton = (
    <IconButton content="Delete" onClick={showDeletePostModal}>
      <BsXLg size="1.3em" />
    </IconButton>
  );
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={data.user.avatar.url} />
          <div>
            <div className="font-semibold">{data.user.username}</div>
            <div className="text-sm text-gray-500">
              {`${data.user.firstname} ${data.user.lastname}`}
            </div>
          </div>
        </div>
        {data.user.id === user.uid ? (
          <div className="flex gap-3">
            {updateButton}
            {deleteButton}
          </div>
        ) : null}
      </div>
      <p>{data.caption}</p>
      <Carousel images={data.images} />
      <PostIcons postId={data.id} totalComments={data.comments} />
    </Card>
  );
}

export default Post;
