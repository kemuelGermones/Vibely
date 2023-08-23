import CommentIcons from "./CommentIcons";
import Avatar from "../ui/Avatar";

function CommentDetails({ postId, data }) {
  return (
    <div className="flex gap-3">
      <Avatar src={data.user.avatar.url} alt={data.user.username} />
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <div className="font-semibold">{data.user.username}</div>
          <CommentIcons
            postId={postId}
            commentId={data.id}
            userId={data.user.id}
          />
        </div>
        <div>{data.description}</div>
      </div>
    </div>
  );
}

export default CommentDetails;