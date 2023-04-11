import { ScheduleItem } from "@componentsReact";
import type { ISchedule } from "@interfaces/schedule";

export default function Schedule({ schedule }: { schedule: ISchedule[] }) {
  return (
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
  );
}
