import { useState, useEffect } from "react";
import type { User } from "@interfaces/user";
import { getDataFromTable } from "@services/config";
import { getUser } from "@services/auth";
import { GetTicket } from "..";

export default function Ticket({ id }: { id: number }) {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const [countTickets, setCountTickets] = useState<number>(0);

  const fetchUser = async () => {
    const user = (await getUser()) as User | null;

    const tickets = await getDataFromTable(
      "tickets",
      {
        key: "user_id",
        value: String(user?.id),
      },
      `*, events(*)`
    );

    setIsRegistered(tickets.length > 0);
  };

  const fetctTickets = async () => {
    const tickets = await getDataFromTable("tickets");
    setCountTickets(tickets.length);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetctTickets();
  }, []);

  return (
    <>
      {isRegistered ? (
        <div className="bg-miduticket">
          <div className="ticket-midufest text-center m-10">
            <h1>#{String(countTickets).padStart(5, "0")}</h1>
            <p className="text-yellow-400 font-semibold italic">
              tickets registrados
            </p>
          </div>
        </div>
      ) : (
        <GetTicket id={id} />
      )}
    </>
  );
}
