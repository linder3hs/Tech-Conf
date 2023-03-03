import { useState, useEffect } from "react";
import { getUser } from "../../services/auth";
import { getDataFromTable } from "../../services/config";
import type { User } from "../../interfaces/user";
import type { ITickets } from "../../interfaces/tickets";
import { Ticket, NotSession } from "./components";
import "./index.css";

export default function Tickets() {
  const [user, setUser] = useState<User | null>(null);

  const [tickets, setTickets] = useState<ITickets[]>([]);

  const fetchUser = async (): Promise<User | null> => {
    const user = (await getUser()) as User | null;

    if (!user) return null;

    setUser(user);

    return user;
  };

  const fetchTickets = async (user: User | null) => {
    if (!user) return;

    const tickets = await getDataFromTable(
      "tickets",
      {
        key: "user_id",
        value: user.id,
      },
      `*, events(*)`
    );

    setTickets(tickets);
  };

  useEffect(() => {
    fetchUser().then((user: User | null) => fetchTickets(user));
  }, []);

  return (
    <>
      {user ? (
        tickets.map((ticket: ITickets) => (
          <Ticket key={ticket.id} ticket={ticket} user={user} />
        ))
      ) : (
        <NotSession />
      )}
    </>
  );
}
