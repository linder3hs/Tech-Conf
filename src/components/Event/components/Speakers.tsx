import type { ISpeaker } from "@interfaces/speaker";

export default function Speakers({ speakers }: { speakers: ISpeaker[] }) {
  return (
    <>
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
                  className="rounded-full m-auto mb-10 "
                  alt={speaker.name}
                />
                <h2 className="text-3xl hover:text-yellow-400">
                  <a href={`/speakers/${speaker.name.replaceAll(" ", "-")}`}>
                    {speaker.name}
                  </a>
                </h2>
              </div>
            )}
          </>
        ))}
      </section>
    </>
  );
}
