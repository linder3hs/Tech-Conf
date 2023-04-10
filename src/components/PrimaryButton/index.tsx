interface Props {
  text: string;
  url: string;
}

export default function PrimaryButton(props: Props) {
  const { text, url } = props;

  return (
    <a
      href={url}
      target="_blank"
      className="bg-yellow-500 p-3 font-medium text-black border-black border-2 rounded-md hover:scale-125 hover:duration-300"
    >
      {text}
    </a>
  );
}
