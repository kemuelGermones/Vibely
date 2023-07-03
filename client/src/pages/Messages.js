import Advertisement from "../components/advertisement/Advertisement";
import Navbar from "../components/navbar/Navbar";
import User from "../components/user/User";
import UserList from "../components/user/UserList";
import Chats from "../components/chat/Chats";

function Messages() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-12 grid h-[calc(100vh-3rem)] grid-rows-1 p-3 sm:grid-cols-[1fr_1.5fr] sm:gap-3 lg:grid-cols-[1fr_1.5fr_1fr]">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <User />
          <UserList />
        </aside>
        <section>
          <Chats />
        </section>
        <aside className="hidden lg:block">
          <Advertisement />
        </aside>
      </main>
    </>
  );
}

export default Messages;
