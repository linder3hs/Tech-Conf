import github from "@assets/github-white.svg";
import { signInWithSocialMedia } from "@services/auth";

export default function NoSession() {
  const fetchLogin = async () => await signInWithSocialMedia();

  return (
    <div className="h-screen">
      <p className="mt-10">
        Para poder ver tus tickets, debes iniciar sesión usando tu cuenta de
        Github.
      </p>
      <button
        onClick={fetchLogin}
        type="button"
        title="Sign in with GitHub"
        className="rounded-full mt-10 bg-gray-800 px-4 py-2 flex items-center gap-5 text-white text-sm border"
      >
        Iniciar sesión{" "}
        <img className="h-6 w-6 rounded-full" src={github} alt="" />
      </button>
    </div>
  );
}
