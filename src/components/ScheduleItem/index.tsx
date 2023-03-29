interface Props {
  title: string;
  speaker: string;
  time: string;
}

export default function ScheduleItem({ title, speaker, time }: Props) {
  return (
    <section className="flex flex-col lg:flex-row border justify-center items-center gap-10 text-left w-full lg:w-2/4 m-auto p-10 rounded-lg hover:scale-110 transition-all duration-500 bg-neutral-900 mb-10">
      <section>
        <h5 className="text-3xl font-semibold">{time}</h5>
      </section>
      <section>
        <h3 className="text-yellow-400">{title}</h3>
        <a
          target="_blank"
          rel="noreferrer"
          className="hover:text-purple-600"
          href={`speakers/${speaker.replaceAll(" ", "-")}`}
        >
          {speaker}
        </a>
      </section>
    </section>
  );
}
