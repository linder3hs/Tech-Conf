import { PrimaryButton } from "@componentsReact";
import type { ISponsor } from "@interfaces/sponsor";

export default function Sponsors({ sponsors }: { sponsors: ISponsor[] }) {
  return (
    <>
      <div id="sponsors">
        <h2 className="mt-10 text-4xl">Sponsors</h2>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mt-20">
        {sponsors.map((sponsor: ISponsor) => (
          <a key={sponsor.id} href={sponsor.link} target="_blank">
            <div className="text-center border border-gray-500 hover:border-yellow-500 rounded-lg w-4/5 lg:w-3/5 m-auto h-48 flex items-center">
              <img
                src={sponsor.src}
                width="200"
                className="m-auto image-white transition-all hover:scale-125"
                alt={sponsor.alt}
              />
            </div>
          </a>
        ))}
      </section>
      <div className="mt-20">
        <PrimaryButton
          text="Sé un sponsor"
          url="https://api.whatsapp.com/send?phone=51967617166&text=Hola%2C%20quiero%20ser%20un%20sponsor!!"
        />
      </div>
    </>
  );
}
