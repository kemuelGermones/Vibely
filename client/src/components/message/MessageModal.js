import MessageList from "./MessageList";
import CreateMessageForm from "./CreateMessageForm";
import Avatar from "../ui/Avatar";

function MessageModal({ data }) {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar src={data.avatar.url} alt={data.username} />
        <div>
          <div className="font-semibold">{data.username}</div>
          <div className="text-sm text-gray-500">
            {`${data.firstname} ${data.lastname}`}
          </div>
        </div>
      </div>
      <div
        id="messageList"
        className="flex h-80 flex-col-reverse overflow-y-auto rounded-lg bg-yellow-200 p-3"
      >
        <MessageList userId={data.id} />
      </div>
      <CreateMessageForm userId={data.id} />
    </div>
  );
}

export default MessageModal;
