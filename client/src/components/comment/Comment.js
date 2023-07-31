import { BsHeart, BsTrash } from "react-icons/bs";

function Comment({ data }) {
  return (
    <div className="flex gap-3">
      <div className="h-10 w-10 shrink-0">
        <img
          className="h-full w-full rounded-full object-cover"
          src={data.user.avatar.url}
        />
      </div>
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <div className="font-semibold">{data.user.username}</div>
          <div className="flex gap-3">
            <BsTrash />
            <BsHeart />
          </div>
        </div>
        <p>{data.description}</p>
      </div>
    </div>
  );
}

export default Comment;
