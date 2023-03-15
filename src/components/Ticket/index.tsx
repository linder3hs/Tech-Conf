import { useState, useEffect } from "react";
import type { User } from "@interfaces/user";
import github from "@assets/github-mark.svg";
import { getUser } from "@services/auth";

export default function Ticket() {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const user = (await getUser()) as User | null;
    console.log(user);
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="mt-10 bg-ticket w-2/6">
        <div className="ticket-content">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-black font-extrabold sm:text-sm lg:text-4xl">
                Tech Conf
              </h1>
              <img
                width={52}
                height={52}
                className="rounded-full"
                src={user?.user_metadata.avatar_url}
                alt=""
              />
            </div>
            <div>
              <p className="font-extrabold">{user?.user_metadata.name}</p>
              <p className="text-gray-500 flex mt-3 items-center gap-3">
                <img className="w-5 h-5" src={github} alt="" />
                {user?.user_metadata.user_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
