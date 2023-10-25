import useAuth from "../../hooks/useAuth";

function MessageDetails({ data }) {
  const { user } = useAuth();

  return (
    <div
      className={`${
        data.senderId === user.uid
          ? "ml-auto mr-0 bg-yellow-400"
          : "ml-0 mr-auto bg-white"
      } max-w-3/5 rounded-lg p-3`}
    >
      {data.content}
    </div>
  );
}

export default MessageDetails;
