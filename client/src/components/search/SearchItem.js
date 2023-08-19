import { useNavigate } from "react-router-dom";

import useModal from "../../hooks/useModal";
import Avatar from "../ui/Avatar";

function SearchItem({ data }) {
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleOnClick = () => {
    closeModal();
    navigate(`/users/${data.id}`);
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-yellow-400"
      onClick={handleOnClick}
    >
      <Avatar src={data.avatar.url} />
      <div>
        <div className="font-semibold">{data.username}</div>
        <div className="text-sm text-gray-500">{`${data.firstname} ${data.lastname}`}</div>
      </div>
    </div>
  );
}

export default SearchItem;
