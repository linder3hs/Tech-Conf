import { signInWithGitHub } from "../../services/auth";

export default function SignUp() {
  return (
    <button
      onClick={signInWithGitHub}
      className="bg-gray-800 border border-black text-white p-2 font-bold rounded-full px-9"
    >
      Registrate
    </button>
  );
}
