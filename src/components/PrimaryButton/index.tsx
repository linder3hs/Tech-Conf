interface Props {
  text: string;
  url: string;
}

export default function PrimaryButton(props: Props) {
  const { text, url } = props;

  return (
    <a
      href={url}
      className="text-lg text-center bg-yellow-300 border-solid border-black border-2 p-3 px-10 font-bold rounded-full block mt-20"
    >
      {text}
    </a>
  );
}
