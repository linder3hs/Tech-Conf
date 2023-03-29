import { useEffect } from "react";
import { Ticket, TimerCountdown, ScheduleItem } from "@componentsReact";
import useUserSubscriber from "@hooks/useUserSubscriber";
import { getUser } from "@services/auth";
import { insertDataIntoTable } from "@services/config";
import type { IEvent } from "@interfaces/tickets";
import type { ISpeaker } from "@interfaces/speaker";

interface IScduele {
  title: string;
  time: string;
  speaker: string;
}

interface Props {
  event: IEvent;
  schedule: IScduele[];
  speakers: ISpeaker[];
}

export default function Event(props: Props) {
  const { event, schedule, speakers } = props;

  const { handleIsSubscribed } = useUserSubscriber();

  const handleURL = async () => {
    const eventId = window.location.pathname.split("/")[2];
    const params = window.location.search.replace("?", "").split("&");

    if (!params[0]) return;

    const [_, value] = params[0].split("=");

    if (value !== "true") return;

    const user = await getUser();

    if (!user) return;

    const isSubscribed = await handleIsSubscribed(eventId, user.id);

    if (isSubscribed) return;

    await insertDataIntoTable("tickets", {
      user_id: user.id,
      event_id: eventId,
    });

    window.location.href = `${window.origin}/events/1`;
  };

  useEffect(() => {
    handleURL();
  }, []);

  return (
    <>
      <main className="lg:m-auto">
        <section className="lg:w-3/4 sm:w-screen m-auto text-center mt-5 lg:mt-10">
          <section>
            <h1 className="text-3xl md:text-3xl lg:text-8xl">
              ⭐️ {event.title}
            </h1>
            <h2 className="text-2xl lg:text-3xl lg:w-1/2 m-auto sm:text-sm font-medium text-yellow-500 mt-10">
              {event.description}
            </h2>
            <p className="lg:text-4xl md:text-3xl sm:text-3xl mt-10 font-extrabold">
              {event.date}
            </p>
            <article className="mt-10 bg-purple-700 w-full lg:w-1/3 m-auto p-1 rounded-xl">
              <h4 className="font-semibold text-lg">
                Streaming en
                <a
                  className="text-yellow-400"
                  target="_blank"
                  href="https://www.twitch.tv/linder3hs"
                >
                  twitch.tv/linder3hs
                </a>
              </h4>
            </article>
            <TimerCountdown />
            <section className="my-10">
              <Ticket id={event.id} />
            </section>
          </section>
          <section id="schedule">
            <h2 className="mt-10 text-4xl">Calendario</h2>
            <section className="mt-10">
              {schedule.map(({ title, time, speaker }) => (
                <ScheduleItem
                  key={speaker}
                  time={time}
                  title={title}
                  speaker={speaker}
                />
              ))}
            </section>
          </section>
          <div id="speakers">
            <h2 className="mt-10 text-4xl">Speakers</h2>
          </div>
          <section className="grid grid-cols-1 lg:grid-cols-2">
            {speakers.map((speaker: ISpeaker) => (
              <>
                {speaker.id !== 4 && (
                  <div key={speaker.id} className="mt-10 text-center">
                    <img
                      src={speaker.image}
                      width="200"
                      className="rounded-full m-auto mb-10"
                      alt={speaker.name}
                    />
                    <h2 className="text-3xl hover:text-yellow-400">
                      <a
                        href={`/speakers/${speaker.name.replaceAll(" ", "-")}`}
                      >
                        {speaker.name}
                      </a>
                    </h2>
                  </div>
                )}
              </>
            ))}
          </section>
        </section>
      </main>
      <footer className="m-20">
        <p className="text-center text-gray-500 text-sm">
          Made by
          <a
            className="text-yellow-400"
            href="https://linderhassinger.info"
            target="_blank"
          >
            Linder Hassinger
          </a>
        </p>
      </footer>
    </>
  );
}