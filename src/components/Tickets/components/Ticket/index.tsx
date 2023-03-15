import { useEffect } from "react";
import type { User } from "../../../../interfaces/user";
import type { ITickets } from "../../../../interfaces/tickets";
import github from "../../../../assets/github-mark.svg";
import JSConfetti from "js-confetti";

interface Props {
  ticket: ITickets;
  user: User;
}

export default function Ticket(props: Props) {
  const { ticket, user } = props;

  useEffect(() => {
    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti();
  }, []);

  return (
    <div className="mt-10 bg-ticket">
      <div className="ticket-content">
        <div className="flex gap-5 mt-10">
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
        <h4 className="mt-5 font-extrabold sm:text-sm lg:text-xl">
          ⭐️ {ticket.events.title}
        </h4>
        <div className="mt-5 flex gap-5 mb-5">
          <div className="flex-1">
            <p className="text-gray-500">{ticket.events.date} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
