import { useEffect, useState } from "react";
import { signInWithSocialMedia, getUser } from "../../services/auth";
import github from "../../assets/github-white.svg";
import type { User } from "../../interfaces/user";

export default function GithubAuth() {
  const fetchLogin = async () => await signInWithSocialMedia();

  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const user = (await getUser()) as User | null;
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <a href="/profile">
          <img
            src={user.user_metadata.avatar_url}
            width={40}
            className="rounded-full cursor-pointer"
          />
        </a>
      ) : (
        <button
          onClick={fetchLogin}
          type="button"
          title="Sign in with GitHub"
          className="rounded-full mt-2 text-sm"
        >
          <img className="h-8 w-8 rounded-full" src={github} alt="" />
        </button>
      )}
    </div>
  );
}
