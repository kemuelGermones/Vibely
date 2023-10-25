import CommentDetailsIcons from "./CommentDetailsIcons";

function CommentDetails({ postId, data }) {
  return (
    <div className="flex items-start gap-3">
      <img
        className="h-10 w-10 rounded-full"
        src={data.user.avatar.url}
        alt={data.user.username}
      />
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <div className="font-semibold">{data.user.username}</div>
          <CommentDetailsIcons postId={postId} data={data} />
        </div>
        <div>{data.description}</div>
      </div>
    </div>
  );
}

export default CommentDetails;
