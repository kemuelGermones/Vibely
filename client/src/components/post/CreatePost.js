import useModal from "../../hooks/useModal";
import CreatePostForm from "./CreatePostForm";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import Input from "../ui/Input";

function CreatePost() {
  const { openModal } = useModal();

  const showCreatePostForm = () => {
    openModal(<CreatePostForm />);
  };

  return (
    <Card>
      <div className="flex items-center gap-3 [&>*:nth-child(2)]:grow">
        <Avatar src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
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
