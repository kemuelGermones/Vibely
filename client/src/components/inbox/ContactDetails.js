import useModal from "../../hooks/useModal";
import MessageModal from "../message/MessageModal";

function ContactDetails({ data }) {
  const { showModal } = useModal();

  const handleOnClickContactDetails = () => {
    showModal(<MessageModal data={data} />);
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-yellow-400"
      onClick={handleOnClickContactDetails}
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

export default ContactDetails;
