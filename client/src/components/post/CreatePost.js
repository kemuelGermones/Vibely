import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import CreatePostForm from "./CreatePostForm";

function CreatePost() {
  const { showModal } = useModal();
  const { user } = useAuth();

  const handleShowCreatePostForm = () => {
    showModal(<CreatePostForm />);
  };

  return (
    <div className="card flex items-center gap-3">
      <img
        className="h-10 w-10 rounded-full"
        src={user.photoURL}
        alt={user.displayName}
      />
      <input
        className="input-primary w-full"
        type="text"
        placeholder="What's on your mind"
        readOnly={true}
        onClick={handleShowCreatePostForm}
      />
    </div>
  );
}

export default CreatePost;
