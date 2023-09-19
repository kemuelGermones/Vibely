import ContactList from "../contact/ContactList";

function InboxDetails() {
  return (
    <div className="card flex flex-col gap-3">
      <div className="text-sm text-gray-500">Inbox</div>
      <div id="contactList" className="h-[calc(100vh-8.3rem)] overflow-y-auto">
        <ContactList />
      </div>
    </div>
  );
}

export default InboxDetails;
