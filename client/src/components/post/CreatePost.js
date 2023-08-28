import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import CreatePostForm from "./CreatePostForm";
import Avatar from "../ui/Avatar";

function CreatePost() {
  const { openModal } = useModal();
  const { user } = useAuth();

  const handleShowCreatePostForm = () => {
    openModal(<CreatePostForm />);
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <Avatar src={user.photoURL} alt={user.displayName} />
        <input
          className="input-primary w-full"
          type="text"
          placeholder="What's on your mind"
          readOnly={true}
          onClick={handleShowCreatePostForm}
        />
      </div>
    </div>
  );
}

export default CreatePost;
