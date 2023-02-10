import { useEffect, useState } from "react";
import { signInWithGitHub, getUser } from "../services/auth";
import github from "../assets/github-mark.svg";

export default function GithubAuth() {
  const fetchLogin = async () => await signInWithGitHub();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getUser();
      console.log(user);
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <img src={user.user_metadata.avatar_url} width={40} className="rounded-full cursor-pointer" />
      ) : (
        <button
          onClick={fetchLogin}
          type="button"
          className="flex rounded-full bg-white text-sm"
        >
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={github} alt="" />
        </button>
      )}
    </div>
  );
}
