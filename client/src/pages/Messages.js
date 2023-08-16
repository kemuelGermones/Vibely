import { Fragment } from "react";

import useAuth from "../hooks/useAuth";
import Advertisement from "../components/advertisement/Advertisement";
import Navbar from "../components/ui/Navbar";
import User from "../components/user/User";
import MessageList from "../components/message/MessageList";

function Messages() {
  const { user } = useAuth();

  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 lg:grid-cols-[1fr_1.5fr_1fr]">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <User userId={user.uid} />
        </aside>
        <section>
          <MessageList />
        </section>
        <aside className="hidden lg:block">
          <Advertisement />
        </aside>
      </main>
    </Fragment>
  );
}

export default Messages;
