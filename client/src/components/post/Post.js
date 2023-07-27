import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsHeart, BsChat } from "react-icons/bs";

import { AuthContext } from "../../store/auth-context";
import { ModalContext } from "../../store/modal-context";
import Comments from "../comment/Comments";
import PostCarousel from "./PostCarousel";
import PostDropdown from "./PostDropdown";

function Post({ data }) {
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);

  const showComments = () => {
    openModal(<Comments />);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0">
            <img
              className="h-full w-full rounded-full object-cover"
              src={data.user.avatar.url}
            />
          </div>
          <div>
            <Link className="font-semibold" to="/users">
              {data.user.username}
            </Link>
            <div className="text-sm text-gray-500">
              {`${data.user.firstname} ${data.user.lastname}`}
            </div>
          </div>
        </div>
        {data.user.id === user.uid ? (
          <PostDropdown id={data.id} caption={data.caption} />
        ) : null}
      </div>
      <p>{data.caption}</p>
      <PostCarousel images={data.images} />
      <div className="flex items-center gap-3">
        <BsHeart
          className="shrink-0 cursor-pointer"
          size="1.5em"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Like"
        />
        <div>100</div>
        <BsChat
          className="shrink-0 cursor-pointer"
          size="1.5em"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Comment"
          onClick={showComments}
        />
        <div>{data.comments}</div>
      </div>
    </div>
  );
}

export default Post;
