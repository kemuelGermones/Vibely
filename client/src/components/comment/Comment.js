import CommentButtons from "./CommentButtons";
import Avatar from "../ui/Avatar";

function Comment({ postId, data }) {
  return (
    <div className="flex gap-3 [&>*:nth-child(2)]:grow">
      <Avatar src={data.user.avatar.url} />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="font-semibold">{data.user.username}</div>
          <CommentButtons
            postId={postId}
            commentId={data.id}
            userId={data.user.id}
          />
        </div>
        <p>{data.description}</p>
      </div>
    </div>
  );
}

export default Comment;
