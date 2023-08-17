import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import CreatePostForm from "./CreatePostForm";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import Input from "../ui/Input";

function CreatePost() {
  const { openModal } = useModal();
  const { user } = useAuth();

  const showCreatePostForm = () => {
    openModal(<CreatePostForm />);
  };

  return (
    <Card>
      <div className="flex items-center gap-3 [&>*:nth-child(2)]:grow">
        <Avatar src={user.photoURL} />
        <Input
          type="text"
          placeholder="What's on your mind"
          onClick={showCreatePostForm}
        />
      </div>
    </Card>
  );
}

export default CreatePost;
