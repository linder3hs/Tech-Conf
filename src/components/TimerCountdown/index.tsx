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

      const targetDate = new Date(2023, 4, 12, 11, 30, 0); // Asegúrate de que el mes esté indexado en 0 (0-11)
      let distance = targetDate.getTime() - today.getTime();

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
