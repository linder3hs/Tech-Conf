import { useState, useEffect } from "react";

interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState<TimeUnits>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();

      const dayMonth = "05/12/";
      let birthday = dayMonth + year;

      const todayStr = `${mm}/${dd}/${year}`;

      if (todayStr > birthday) birthday = dayMonth + (year + 1);

      const countDown = new Date(birthday).getTime();
      const now = new Date().getTime();
      const distance = countDown - now;

      setTimeRemaining({
        days: Math.floor(distance / day),
        hours: Math.floor((distance % day) / hour),
        minutes: Math.floor((distance % hour) / minute),
        seconds: Math.floor((distance % minute) / second),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="flex gap-10 mt-10 text-center justify-center">
      <section>
        <h1>{timeRemaining.days}</h1>
        <p>Días</p>
      </section>
      <section>
        <h1>{timeRemaining.hours}</h1>
        <p>Horas</p>
      </section>
      <section>
        <h1>{timeRemaining.minutes}</h1>
        <p>Minutos</p>
      </section>
      <section>
        <h1>{timeRemaining.seconds}</h1>
        <p>Segundos</p>
      </section>
    </section>
  );
}
