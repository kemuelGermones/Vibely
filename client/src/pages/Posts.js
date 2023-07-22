import { useContext } from "react";

import Navbar from "../components/navbar/Navbar";
import UserList from "../components/user/UserList";
import User from "../components/user/User";
import PostList from "../components/post/PostList";
import Advertisement from "../components/advertisement/Advertisement";
import { ModalContext } from "../store/modal-context";
import CreatePost from "../components/post/CreatePost";

function Posts() {
  const { openModal } = useContext(ModalContext);

  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 lg:grid-cols-[1fr_1.5fr_1fr]">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <User />
          <UserList />
        </aside>
        <section className="flex flex-col gap-3">
          <div className="rounded-lg bg-white p-3 shadow">
            <div className="flex gap-3">
              <div className="h-12 w-12 shrink-0">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              </div>
              <input
                className="block w-full rounded-lg border-yellow-300 p-3 shadow focus:border-yellow-300 focus:ring-yellow-300"
                type="text"
                placeholder="What's on your mind"
                onClick={() => {
                  openModal(<CreatePost />);
                }}
              />
            </div>
          </div>
          <PostList />
        </section>
        <aside className="hidden lg:block">
          <Advertisement />
        </aside>
      </main>
    </>
  );
}

export default Posts;
