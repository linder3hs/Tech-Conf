import { useState, useEffect } from "react";
import { getUser } from "@services/auth";

import type { User } from "@interfaces/user";

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  const handleGetUser = async () => {
    const user = (await getUser()) as User | null;
    setUser(user);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return { user };
}
