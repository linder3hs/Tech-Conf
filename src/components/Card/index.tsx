import type { Props } from "./types";

export default function Card(props: Props) {
  const { title, description, date, id } = props;

  return (
    <div className=" cursor-pointer mb-5 mt-10">
      <div className="bg-white opacity-25 rounded-lg shadow-2xl"></div>
      <div className="transform hover:skew-y-1 transition duration-300">
        <div className="h-full w-full bg-white rounded-lg shadow-2xl">
          <div className="bg-white p-14 border border-gray-200 rounded-lg shadow">
            <h2 className="font-bold text-5xl h-16 text-center">
              {title ?? ""}
            </h2>
            <p className="mt-5 h-20">{description}</p>
            <p className="mt-10 text-blue-800 font-bold">{date}</p>

            <div className="mt-10 flex items-center justify-between">
              <a
                href={`/events/${id}`}
                className="bg-red-500 text-white p-2 font-bold rounded-full px-5"
              >
                Ver detalle
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
