import { Fragment } from "react";

import useAuth from "../hooks/useAuth";
import Advertisement from "../components/misc/Advertisement";
import Navbar from "../components/ui/Navbar";
import UserDetails from "../components/user/UserDetails";
import ConversationList from "../components/conversation/ConversationList";
import About from "../components/misc/About";
import Rules from "../components/misc/Rules";

function Inbox() {
  const { user } = useAuth();

  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 lg:grid-cols-[1fr_1.5fr_1fr]">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <UserDetails userId={user.uid} />
          <About />
          <Rules />
        </aside>
        <section>
          <ConversationList />
        </section>
        <aside className="hidden lg:block">
          <Advertisement />
        </aside>
      </main>
    </Fragment>
  );
}

export default Inbox;
