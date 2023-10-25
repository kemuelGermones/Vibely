import { useNavigate } from "react-router-dom";

import useModal from "../../hooks/useModal";

function SearchDetails({ data }) {
  const { hideModal } = useModal();
  const navigate = useNavigate();

  const handleOnClickSearchDetails = () => {
    hideModal();
    navigate(`/users/${data.id}`);
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-yellow-400"
      onClick={handleOnClickSearchDetails}
    >
      <img
        className="h-10 w-10 rounded-full"
        src={data.avatar.url}
        alt={data.username}
      />
      <div>
        <div className="font-semibold">{data.username}</div>
        <div className="text-sm text-gray-500">{`${data.firstname} ${data.lastname}`}</div>
      </div>
    </div>
  );
}

export default SearchDetails;
