import useAuth from "../../hooks/useAuth";
import PostCarousel from "./PostCarousel";
import PostDropdown from "./PostDropdown";
import PostButtonGroup from "./PostButtonGroup";

function Post({ data }) {
  const { user } = useAuth();

  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0">
              <img
                className="h-full w-full rounded-full object-cover"
                src={data.user.avatar.url}
              />
            </div>
            <div>
              <div className="font-semibold">{data.user.username}</div>
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
        <PostButtonGroup id={data.id} totalComments={data.comments} />
      </div>
    </div>
  );
}

export default Post;
