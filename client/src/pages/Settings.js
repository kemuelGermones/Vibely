import { useContext } from "react";

import Advertisement from "../components/advertisement/Advertisement";
import Navbar from "../components/navbar/Navbar";
import UserList from "../components/user/UserList";
import UpdateUserImage from "../components/user/UpdateUserImage";
import UpdateUserInformation from "../components/user/UpdateUserInformation";
import UpdateUserEmail from "../components/user/UpdateUserEmail";
import UpdateUserPassword from "../components/user/UpdateUserPassword";

function Settings() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 md:max-w-screen-md">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <UserList />
          <Advertisement />
        </aside>
        <section className="flex flex-col gap-3">
          <UpdateUserImage />
          <UpdateUserInformation />
          <UpdateUserEmail />
          <UpdateUserPassword />
        </section>
      </main>
    </>
  );
}

export default Settings;
