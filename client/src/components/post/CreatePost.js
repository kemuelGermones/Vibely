import useModal from "../../hooks/useModal";
import CreatePostForm from "./CreatePostForm";

function CreatePost() {
  const { openModal } = useModal();

  const showCreatePostForm = () => {
    openModal(<CreatePostForm />);
  };

  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0">
          <img
            className="h-full w-full rounded-full object-cover"
            src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
        <input
          className="block w-full rounded-lg border-yellow-300 p-3 shadow focus:border-yellow-300 focus:ring-yellow-300"
          type="text"
          placeholder="What's on your mind"
          onClick={showCreatePostForm}
        />
      </div>
    </div>
  );
}

export default CreatePost;
