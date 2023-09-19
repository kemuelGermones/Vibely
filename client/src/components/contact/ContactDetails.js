import useModal from "../../hooks/useModal";
import Avatar from "../ui/Avatar";
import MessageModal from "../message/MessageModal";

function ContactDetails({ data }) {
  const { openModal } = useModal();

  const handleOnClickContactDetails = () => {
    openModal(<MessageModal data={data} />);
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-yellow-400"
      onClick={handleOnClickContactDetails}
    >
      <Avatar src={data.avatar.url} alt={data.username} />
      <div>
        <div className="font-semibold">{data.username}</div>
        <div className="text-sm text-gray-500">{`${data.firstname} ${data.lastname}`}</div>
      </div>
    </div>
  );
}

export default ContactDetails;
