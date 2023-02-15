import { useState, useEffect } from "react";
import { getUser, signout } from "../../services/auth";

export default function Profile() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const { user } = await getUser();
    console.log(user);
    setUser(user.user_metadata);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div className="bg-white border shadow rounded-lg lg:w-3/6 m-auto p-6">
          <div className="text-center">
            <img
              src={user?.avatar_url}
              width="100"
              className="rounded-full"
              alt={user?.preferred_username}
            />
            <h3 className="mt-3 text-2xl font-bold">{user.name}</h3>
            <a
              href={`https://github.com/${user.preferred_username}`}
              target="_blank"
            >
              <p className="mt-3 text-red-500">@{user.preferred_username}</p>
            </a>
            <button
              onClick={signout}
              className="mt-10 p-3 bg-gray-800 text-white rounded-full px-6"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Aún no inicias sesión</h3>
        </div>
      )}
    </div>
  );
}
