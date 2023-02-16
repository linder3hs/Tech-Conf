import { useState, useEffect } from "react";
import { getUser } from "../../services/auth";
import {
  insertDataIntoTable,
  getTicketRecord,
  getDataFromTable,
} from "../../services/config";
import Swal from "sweetalert2";
import "./index.css";

export default function Card(props) {
  const { title, description, date, capacity, id } = props.event;

  const [isSubscribed, setIsSubscribed] = useState(true);

  const [tickets, setTickets] = useState(0);

  const handleGetTickets = async () => {
    const tickets = await getDataFromTable("tickets", {
      key: "event_id",
      value: id,
    });

    setTickets(tickets.length);
  };

  const handleIsSubscribed = async () => {
    const { user } = await getUser();

    if (!user) return;

    const { length } = await getTicketRecord(id, user.id);

    if (length) return;

    setIsSubscribed(false);
  };

  const handleSubscribe = async () => {
    const { user } = await getUser();

    const response = await insertDataIntoTable("tickets", {
      user_id: user.id,
      event_id: id,
    });

    if (!response) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal, intentalo de nuevo",
      });

      return;
    }

    setIsSubscribed(true);
    handleGetTickets();

    Swal.fire({
      icon: "success",
      title: "¡Genial!",
      text: "Te has inscrito al evento",
    });
  };

  useEffect(() => {
    handleIsSubscribed();
  }, []);

  useEffect(() => {
    handleGetTickets();
  }, []);

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow">
      <h2 className="font-bold text-2xl h-16">{title ?? ""}</h2>
      <p className="mt-5 h-20">{description}</p>

      <p className="mt-10 text-blue-800 font-bold">{date}</p>
      <div className="mt-10 flex items-center justify-between ">
        {!isSubscribed ? (
          <button
            onClick={handleSubscribe}
            className="bg-yellow-300 border-solid border-black border-2 p-2 font-bold rounded-full px-9"
          >
            Iscribirme
          </button>
        ) : (
          <a
            href="/tickets"
            className="bg-red-500 text-white p-2 font-bold rounded-full px-9"
          >
            Ver Ticket
          </a>
        )}

        <p>
          {tickets} / {capacity}
        </p>
      </div>
    </div>
  );
}
