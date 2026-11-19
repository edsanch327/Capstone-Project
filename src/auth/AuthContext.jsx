import { createContext, useContext, useEffect, useState } from "react";

import { request } from "./api.js";

const Context = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("forma_token")) {
      setLoading(false);
      return;
    }

    request("/auth/me")
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("forma_token");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(email, password) {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    localStorage.setItem("forma_token", data.token);
    setUser(data.user);
  }

  async function register(name, email, password) {
    const data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    localStorage.setItem("forma_token", data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("forma_token");
    setUser(null);
  }

  return (
    <Context.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useAuth = () => useContext(Context);
