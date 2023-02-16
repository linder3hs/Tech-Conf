import { useState, useEffect } from "react";
import { getUser } from "../../services/auth";
import { getDataFromTable } from "../../services/config";
import github from "../../assets/github-mark.svg";

export default function Tickets() {
  const [user, setUser] = useState(null);

  const [tickets, setTickets] = useState([]);

  const fetchUser = async () => {
    const { user } = await getUser();
    console.log(user);
    setUser(user);

    return user;
  };

  const fetchTickets = async (user) => {
    const tickets = await getDataFromTable(
      "tickets",
      {
        key: "user_id",
        value: user.id,
      },
      `*, events(*)`
    );
    console.log(tickets);
    setTickets(tickets);
  };

  useEffect(() => {
    fetchUser().then((user) => fetchTickets(user));
  }, []);

  return (
    <>
      {tickets.map((ticket, index) => (
        <div
          key={ticket.id}
          className="mt-10 bg-white border-4 border-red-500 shadow rounded-lg p-10"
        >
          <div className="">
            <div className="flex gap-5">
              <div>
                <img
                  width={52}
                  height={52}
                  className="rounded-full"
                  src={user.user_metadata.avatar_url}
                  alt=""
                />
              </div>
              <div>
                <p className="font-extrabold">{user.user_metadata.name}</p>
                <p className="text-gray-500 flex mt-3 items-center gap-3">
                  <img className="w-5 h-5" src={github} alt="" />
                  {user.user_metadata.user_name}
                </p>
              </div>
            </div>
            <h3 className="mt-10 font-extrabold text-2xl">
              ⭐️ {ticket.events.title}
            </h3>
            <p className="mt-5 text-gray-500">{ticket.events.description}</p>
            <div className="mt-10 flex gap-5">
              <div className="flex-1">
                <p className="text-gray-500">📅 Fecha: </p>
                <p className="font-extrabold">{ticket.events.date}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
